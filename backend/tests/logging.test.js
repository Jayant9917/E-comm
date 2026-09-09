const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const path = require('node:path');
const run = promisify(execFile);
const cwd = path.resolve(__dirname, '..');

test('HTTP logs correlate activity, classify statuses and exclude sensitive data', async () => {
  const code = `
    const express = require('express');
    const logger = require('./config/logger');
    const app = express();
    app.use(require('./middleware/requestLogger'));
    app.use(express.json());
    app.get('/ok', (req, res) => { req.log.info('Activity marker'); res.json({ requestId: req.id }); });
    app.get('/denied', (_req, res) => res.sendStatus(401));
    app.get('/failure', () => { throw new Error('Failure with ' + process.env.JWT_SECRET); });
    app.post('/body', (_req, res) => res.sendStatus(200));
    app.use(require('./middleware/errorHandler'));
    const server = app.listen(0, '127.0.0.1', async () => {
      try {
        const base = 'http://127.0.0.1:' + server.address().port;
        for (const url of ['/ok?token=query-secret', '/denied', '/failure', '/missing']) {
          const response = await fetch(base + url, { headers: { authorization: 'Bearer header-secret', cookie: 'session=cookie-secret' } });
          if (!response.headers.get('x-request-id')) throw new Error('Missing request ID header');
          if (url.startsWith('/ok')) {
            const body = await response.json();
            if (body.requestId !== response.headers.get('x-request-id')) throw new Error('Request ID mismatch');
          } else await response.text();
        }
        await (await fetch(base + '/body', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"password":"body-secret" broken' })).text();
        logger.info({ password: 'structured-secret', user: { token: 'nested-secret' } }, 'Redaction marker');
      } catch (err) { process.exitCode = 1; }
      finally { server.close(); server.closeAllConnections(); }
    });
  `;
  const { stdout, stderr } = await run(process.execPath, ['-e', code], {
    cwd, env: { ...process.env, NODE_ENV: 'production', LOG_PRETTY: 'false', LOG_LEVEL: 'debug', JWT_SECRET: 'configured-secret' },
    timeout: 20000,
  });
  assert.equal(stderr, '');
  for (const secret of ['query-secret', 'header-secret', 'cookie-secret', 'body-secret', 'structured-secret', 'nested-secret', 'configured-secret']) {
    assert.ok(!stdout.includes(secret), `Leaked ${secret}`);
  }
  const records = stdout.trim().split('\n').map(JSON.parse);
  const completed = records.filter(r => r.res);
  assert.equal(completed.length, 5);
  assert.deepEqual(completed.map(r => r.res.statusCode), [200, 401, 500, 404, 400]);
  assert.deepEqual(completed.map(r => r.level), [30, 40, 50, 40, 40]);
  assert.equal(new Set(completed.map(r => r.req.id)).size, 5);
  assert.ok(completed.every(r => typeof r.responseTime === 'number' && r.responseTime >= 0));
  assert.ok(completed.every(r => !r.req.url.includes('?')));
  assert.equal(records.find(r => r.msg === 'Activity marker').req.id, completed[0].req.id);
  assert.equal(completed[2].err.type, 'Error');
  assert.ok(completed[2].err.stack);
});

test('development pretty logging exits with readable output', async () => {
  const { stdout } = await run(process.execPath, ['-e', "require('./config/logger').info({event:'test'}, 'Pretty output marker')"], {
    cwd, env: { ...process.env, NODE_ENV: 'development', VERCEL: '', LOG_PRETTY: 'true', LOG_LEVEL: 'info' }, timeout: 10000,
  });
  assert.match(stdout, /INFO/);
  assert.match(stdout, /Pretty output marker/);
});

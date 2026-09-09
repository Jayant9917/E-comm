const { randomUUID } = require('crypto');
const pinoHttp = require('pino-http');
const logger = require('../config/logger');

module.exports = pinoHttp({
  logger,
  wrapSerializers: false,
  genReqId(_req, res) {
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
  // Log path only: query strings, request bodies and headers can contain credentials.
  serializers: {
    err: logger.serializeError,
    req: req => ({ id: req.id, method: req.method, url: req.url?.split('?')[0] }),
    res: res => ({ statusCode: res.statusCode }),
  },
  customLogLevel(_req, res, err) {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return err ? 'error' : 'info';
  },
  customSuccessMessage(req, res) { return `${req.method} ${req.url.split('?')[0]} ${res.statusCode}`; },
  customErrorMessage(req, res) { return `${req.method} ${req.url.split('?')[0]} ${res.statusCode}`; },
});

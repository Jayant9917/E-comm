const pino = require('pino');

const production = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
const secrets = Object.entries(process.env)
  .filter(([key, value]) => /SECRET|PASSWORD|PASS$|TOKEN|API_KEY|MONGODB_URI/i.test(key) && value?.length >= 6)
  .map(([, value]) => value);

function safeText(value) {
  let text = String(value || '');
  for (const secret of secrets) text = text.split(secret).join('[Redacted]');
  return text.replace(/mongodb(?:\+srv)?:\/\/[^\s]+/gi, '[Redacted database URI]')
    .replace(/Bearer\s+[^\s]+/gi, 'Bearer [Redacted]');
}

function serializeError(error) {
  if (!error) return undefined;
  // Validation/parser errors may embed entire user-submitted values in their message.
  const sensitive = ['ValidationError', 'CastError'].includes(error.name) || error.type === 'entity.parse.failed';
  const message = sensitive ? 'Request data validation failed' : safeText(error.message);
  return {
    type: error.name || 'Error', message,
    code: typeof error.code === 'string' || typeof error.code === 'number' ? error.code : undefined,
    stack: error.stack ? safeText(sensitive ? error.stack.replace(error.message, message) : error.stack) : undefined,
  };
}

const options = {
  name: 'rabbit-api',
  level: process.env.LOG_LEVEL || (production ? 'info' : 'debug'),
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: { err: serializeError },
  redact: {
    paths: ['password', 'token', 'authorization', 'cookie', 'secret', 'apiKey',
      '*.password', '*.token', '*.authorization', '*.cookie', '*.secret', '*.apiKey',
      'req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]',
      'req.body', 'body', 'paymentDetails'],
    censor: '[Redacted]',
  },
};

let destination;
if (!production && process.env.LOG_PRETTY !== 'false') {
  destination = require('pino-pretty')({
    colorize: Boolean(process.stdout.isTTY), translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
    ignore: 'pid,hostname,name', singleLine: true, sync: true,
  });
}

const logger = pino(options, destination);
module.exports = logger;
module.exports.serializeError = serializeError;

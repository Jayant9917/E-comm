# Development logging

From `backend`, run `npm run dev`. Pino prints readable timestamped logs in your
terminal. Production (`NODE_ENV=production` or Vercel) writes structured JSON to
stdout for the hosting provider's logs. No log files are created automatically.

Optional settings in `backend/.env`:

```env
NODE_ENV=development
LOG_LEVEL=debug
LOG_PRETTY=true
```

Levels, from most detailed to least: `trace`, `debug`, `info`, `warn`, `error`,
`fatal`, `silent`. Set `LOG_PRETTY=false` for JSON locally. Restart the server
after changing logging settings. Production defaults to `info`.

Every completed request includes a generated request ID, HTTP method, path,
status code and `responseTime` in milliseconds. Successful requests log at
`info`, 4xx responses at `warn`, and 5xx responses at `error`. Match the browser's
`X-Request-Id` response header to terminal entries when troubleshooting.
Logs cover database connections/disconnections, route errors, email delivery
activity and catalog upload/seed progress. They don't log database queries.

Use the request logger inside routes to keep activity correlated:

```js
req.log.info({ productId: product._id }, 'Product updated');
req.log.debug({ itemCount: cart.products.length }, 'Cart loaded');
req.log.error({ err }, 'Product update failed');
```

Outside requests, use `require('./config/logger')` (adjust the relative path).
Log errors under the `err` key to retain their type, message and stack.
Request bodies, query strings, cookies and authorization headers are omitted
from automatic HTTP logs. Common sensitive structured fields are redacted;
the error serializer omits nested validation values and masks configured
secrets and database connection strings. Do not interpolate secrets or entire
user/payment objects into log messages.

Run `npm run test:logging` to verify status levels, request correlation,
timings, malformed request handling, secret filtering and pretty output.

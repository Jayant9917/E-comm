# Deploy the backend on Railway

The repository can stay as one GitHub repository. Create one Railway service
from this repository and set its **Root Directory** to `backend`.

Railway settings:

- Root directory: `backend`
- Build command: leave empty (Railway detects Node and runs the install step)
- Start command: `npm start`
- Healthcheck path: `/health`

Add these variables in the Railway service. Never commit their values:

```env
NODE_ENV=production
LOG_LEVEL=info
LOG_PRETTY=false
FRONTEND_URL=https://your-frontend.vercel.app
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-long-random-secret
SMTP_USER=your-brevo-user
SMTP_PASS=your-brevo-password
SENDER_EMAIL=your-sender-email
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
SEED_ADMIN_NAME=Rabbit Admin
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=your-strong-admin-password
```

Do not set `PORT` manually. Railway supplies it and `server.js` reads
`process.env.PORT`.

The three `SEED_ADMIN_*` variables control the first administrator created by
`npm run seed`:

- `SEED_ADMIN_NAME`: the name shown for the admin account.
- `SEED_ADMIN_EMAIL`: the email used to log into the admin panel.
- `SEED_ADMIN_PASSWORD`: the password for that admin account.

They are only needed when no admin user exists yet. The seed script does not
replace an existing administrator. `SEED_ADMIN_PASSWORD` is the admin login
password; it is separate from `JWT_SECRET`, which signs login tokens. Keep both
private and use different random values.

After the first deployment, generate a Railway public domain and test:

```text
https://your-railway-domain/health
https://your-railway-domain/api/products
```

Expected responses are `{ "status": "ok", "service": "rabbit-api" }` and the
product array. Then set the frontend's Vercel variable:

```env
VITE_BACKEND_URL=https://your-railway-domain
```

If the Railway service fails, open its Deploy Logs. The most useful first checks
are `MongoDB connected`, `Server listening`, and the value of `MONGODB_URI` in
Railway Variables. Do not paste secrets into logs or chat.

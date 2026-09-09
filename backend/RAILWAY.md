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
```

Do not set `PORT` manually. Railway supplies it and `server.js` reads
`process.env.PORT`.

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

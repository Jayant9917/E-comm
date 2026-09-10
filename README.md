# Rabbit E-commerce Platform

Rabbit is a full-stack clothing e-commerce application with a React storefront, an Express/MongoDB API, customer authentication, PayPal checkout, product search and filtering, and an admin dashboard.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- Responsive storefront with featured collections, new arrivals, and product details
- Product search, category/gender filters, sorting, and similar-product recommendations
- Guest cart support with cart merging after sign-in
- JWT authentication, protected routes, and role-based admin access
- PayPal checkout and order history
- Admin tools for users, products, inventory, and orders
- Cloudinary image uploads and SMTP/Brevo email notifications
- Structured request and error logging

## Tech stack

- **Frontend:** React 19, Vite, React Router, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs
- **Integrations:** PayPal, Cloudinary, Nodemailer/Brevo

## Project structure

```text
E-comm/
├── frontend/   # React/Vite client
├── backend/    # Express API, database models, routes, and services
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database
- PayPal developer credentials for checkout
- SMTP/Brevo credentials for email features
- Cloudinary credentials for image uploads

### Install

```bash
git clone https://github.com/Jayant9917/E-comm.git
cd E-comm
cd backend && npm install
cd ../frontend && npm install
```

Create `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/rabbit-store
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
PORT=5000
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SENDER_EMAIL=noreply@example.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
```

Never commit `.env` files or production credentials.

### Seed and run

```bash
cd backend
npm run seed
npm run dev
```

In a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Useful scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| backend | `npm run seed:check` | Preview database seeding |
| backend | `npm run test:logging` | Run logging tests |
| backend | `npm run catalog:check` | Validate catalog upload |
| frontend | `npm run lint` | Run ESLint |
| frontend | `npm run build` | Create a production build |

## API overview

The API includes route groups for users, products, carts, checkout, orders, administration, subscriptions, and image uploads. See [`backend/routes`](backend/routes) for current endpoints and authorization requirements.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request and follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security

Please do not report vulnerabilities in public issues. Follow [SECURITY.md](SECURITY.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Created and maintained by [Jayant Rana](https://github.com/Jayant9917).

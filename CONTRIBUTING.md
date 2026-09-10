# Contributing

1. Fork the repository and create a focused branch from `main`.
2. Install dependencies in both `backend` and `frontend`.
3. Keep secrets in local `.env` files and never commit credentials.
4. Run relevant checks before opening a pull request:

   ```bash
   cd frontend && npm run lint && npm run build
   cd ../backend && npm run test:logging
   ```

5. Describe the change, testing performed, and any configuration notes in the pull request.

Please keep changes focused and follow the existing conventions. By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

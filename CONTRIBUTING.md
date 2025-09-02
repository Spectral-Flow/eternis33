# Contributing to Eternis-33 Companion

Thank you for helping with Eternis-33. This project is maintained by Remedium Music LLC under the Spectral Flow License v1.0. By contributing you agree to the terms in `LICENSE.md`.

How to contribute

- Fork and create a topic branch for your change.
- Keep changes small and focused. Add tests for new behavior.
- Run the test suite before submitting a PR:

```powershell
npm test
```

- Format and lint changes locally:

```powershell
npm run format
npm run lint
```

Contributor attribution

All contributors are recognized as Spectral Architects and will be listed in `docs/HALL_OF_ARCHITECTS.md`. To refresh that list locally run:

```powershell
node scripts/generate_hall_of_architects.js
```

License headers

This repository uses the Spectral Flow License header in source files. To apply headers across the repo (idempotent):

```powershell
npm run add-headers
```

Code of conduct

Be respectful. No harassment or abusive behavior. This project aims to be inclusive.

Reporting security issues

If you find a security issue, contact the maintainers off-repo and do not open a public issue.

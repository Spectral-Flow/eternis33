# Extended Project Enhancements Setup Guide

This document provides setup instructions for the enhanced Eternis-33 project with E2E tests, commit hooks, and dependency automation.

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Initialize Husky (if not done)
```bash
pnpm dlx husky init
```

### 3. Set up Android Keystore (for mobile development)
```bash
cd apps/mobile/android
./generate-keystore.sh
# Follow prompts and update gradle.properties with your password
```

### 4. Verify Setup
```bash
pnpm doctor    # Run all health checks
pnpm test      # Run test suite (51 tests)
```

## E2E Testing

### Web E2E (Playwright)
```bash
# Install browsers (one-time)
cd apps/web/e2e
npx playwright install

# Run tests
pnpm e2e:web
```

### Mobile E2E (Detox)
```bash
# Build and test iOS
pnpm e2e:mobile:ios

# Build and test Android
pnpm e2e:mobile:android
```

### Complete E2E Suite
```bash
pnpm e2e:all
```

## Development Workflow

### Commit Hooks
- Pre-commit: Runs Prettier + ESLint on staged files
- Commit-msg: Validates conventional commit format

Example commits:
```bash
git commit -m "feat(web): add new component"
git commit -m "fix(mobile): resolve navigation bug"
git commit -m "docs: update deployment guide"
```

### Dependency Updates
- Renovate: Automated PRs for dependency updates
- Dependabot: GitHub-native alternative (if preferred)

Enable Renovate app on your repository or turn on Dependabot in repository settings.

## Android Deployment

### Build Commands
```bash
cd apps/mobile/android

# Debug APK
./gradlew assembleDebug

# Release APK (signed)
./gradlew assembleRelease

# App Bundle for Play Store
./gradlew bundleRelease
```

### Play Store Setup
1. Create Google Play Console account ($25 fee)
2. Generate signed AAB with `bundleRelease`
3. Upload AAB to Play Console
4. Complete store listing and policies
5. Submit for review

See [Android Deployment Guide](android-deployment.md) for detailed instructions.

## CI/CD

### GitHub Actions
- `e2e-web.yml`: Runs web E2E tests on PRs
- `ci.yml`: Runs comprehensive test suite

### Manual Testing
```bash
# Local development server
npm run serve:proto

# In another terminal
pnpm e2e:web
```

## Project Structure

```
├── apps/
│   ├── web/e2e/           # Playwright tests
│   ├── mobile/
│   │   ├── android/       # Android build config
│   │   └── e2e/          # Detox tests
├── .github/
│   ├── workflows/        # CI/CD configurations
│   └── dependabot.yml   # Dependency automation
├── .husky/              # Git hooks
├── docs/                # Documentation
└── scripts/             # Build and utility scripts
```

## Troubleshooting

### Common Issues

**Playwright browser not found**: Run `npx playwright install`

**Android build fails**: Check Android SDK installation and environment variables

**Commit hooks not working**: Ensure Husky is initialized with `pnpm dlx husky init`

**E2E tests timeout**: Increase timeout in test configs or check if server is running

### Support
- Check existing documentation in `docs/` folder
- Review test outputs for specific error messages
- Ensure all prerequisites are installed

## Scripts Reference

All available from project root:

```json
{
  "doctor": "pnpm -r run doctor",
  "e2e:web": "pnpm --filter @spectra/web-e2e e2e",
  "e2e:mobile:ios": "pnpm --filter @spectra/mobile-e2e e2e:ios:test",
  "e2e:mobile:android": "pnpm --filter @spectra/mobile-e2e e2e:android:test",
  "e2e:all": "pnpm e2e:web && pnpm e2e:mobile:ios && pnpm e2e:mobile:android"
}
```
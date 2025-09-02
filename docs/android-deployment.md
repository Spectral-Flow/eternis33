# Android Build & Play Store Deployment Guide

## Prerequisites

### Development Environment

- [Android Studio](https://developer.android.com/studio) - Latest version
- Android SDK (API 34 recommended)
- Node.js (≥18) and pnpm (≥9)

### Environment Variables

Add to your shell config (`~/.bashrc` or `~/.zshrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH
```

On Linux: `$HOME/Android/Sdk`  
On Windows: `%LOCALAPPDATA%\Android\Sdk`

## Android Setup

### 1. Generate Keystore (One-time setup)

```bash
cd apps/mobile/android
./generate-keystore.sh
```

This creates `my-release-key.keystore` for signing releases.

**⚠️ Important**: Store the keystore and password safely! You'll need them for all future releases.

### 2. Configure Signing

Edit `android/gradle.properties` with your keystore password:

```properties
MYAPP_UPLOAD_STORE_PASSWORD=your_actual_password
MYAPP_UPLOAD_KEY_PASSWORD=your_actual_password
```

### 3. Build APK/AAB

**Debug APK** (for testing):

```bash
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

**Release APK** (signed):

```bash
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

**App Bundle** (for Play Store):

```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

## Google Play Store Deployment

### 1. Developer Account Setup

- Go to [Google Play Console](https://play.google.com/console)
- Pay one-time $25 registration fee
- Complete developer profile

### 2. Create New App

1. **All Apps** → **Create App**
2. Fill in:
   - App Name: "Eternis-33" (or your choice)
   - Default Language: English
   - App Type: App
   - Distribution: Free/Paid

### 3. Store Listing Requirements

**Icon**: 512x512 PNG  
**Feature Graphic**: 1024x500 JPG/PNG  
**Screenshots**: Minimum 2, 1080p+ recommended  
**Description**: Compelling app description  
**Privacy Policy**: Required (can be simple GitHub Pages doc)

### 4. App Content & Policies

**Data Safety**:

- Declare what data you collect
- Can mark "No personal data" if applicable

**Content Rating**:

- Complete questionnaire for age rating

**Target Audience**:

- Select appropriate age groups

### 5. Upload & Release

1. **Production** → **Create Release**
2. Upload `app-release.aab`
3. Set version name (e.g., "1.0.0") and version code (e.g., 1)
4. **Review** → **Roll out to Production**

**First approval**: 2-7 days  
**Subsequent updates**: Usually faster

### 6. Version Management

For each update:

1. Increment `versionCode` in `build.gradle`
2. Update `versionName` as needed
3. Build new AAB
4. Upload to Play Console

## Security Notes

- **Never commit keystores** to version control
- Use different keystores for debug/release
- Store production keystore in secure location
- Consider using Google Play App Signing for additional security

## CI/CD Integration

For automated releases, store keystore and passwords as encrypted secrets in your CI system.

```bash
# Example CI command
./gradlew bundleRelease \
  -PMYAPP_UPLOAD_STORE_PASSWORD="$KEYSTORE_PASSWORD" \
  -PMYAPP_UPLOAD_KEY_PASSWORD="$KEY_PASSWORD"
```

## Troubleshooting

**Build Errors**: Ensure Android SDK is updated and environment variables are set correctly.

**Signing Issues**: Verify keystore path and passwords in `gradle.properties`.

**Play Console Rejection**: Check content policies and ensure all required metadata is provided.

**Version Conflicts**: Each upload must have a unique `versionCode` higher than the previous release.

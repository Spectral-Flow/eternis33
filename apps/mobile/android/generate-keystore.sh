#!/usr/bin/env bash
set -e

echo "🔑 Generating Android keystore for Eternis-33"

# Check if keystore already exists
if [ -f "my-release-key.keystore" ]; then
    echo "⚠️  Keystore already exists. Remove it first if you want to regenerate."
    exit 1
fi

# Generate keystore
keytool -genkey -v -keystore my-release-key.keystore \
  -alias eternis33-key \
  -keyalg RSA -keysize 2048 -validity 10000

echo "✅ Keystore generated successfully!"
echo "📝 Please update android/gradle.properties with your password"
echo "🔒 Store the keystore and password safely for production releases"
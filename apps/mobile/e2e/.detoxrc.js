/** Minimal Detox config placeholder. Adjust app IDs and binary paths for your project. */
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'jest.config.js',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build: 'echo "Build iOS app here (xcodebuild)"',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/App.app',
    },
    'android.debug': {
      type: 'android.apk',
      build: 'echo "Build Android app here (gradle)"',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 14' } },
    emulator: {
      type: 'android.emulator',
      device: { avdName: 'Pixel_5_API_31' },
    },
  },
  configurations: {
    'ios.debug': { device: 'simulator', app: 'ios.debug' },
    'android.debug': { device: 'emulator', app: 'android.debug' },
  },
};

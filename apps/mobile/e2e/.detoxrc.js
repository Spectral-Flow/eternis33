module.exports = {
  testRunner: 'jest',
  runnerConfig: 'jest.config.js',
  specs: 'tests',
  behavior: { init: { exposeGlobals: true } },
  apps: {
    'ios.sim.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/EternisApp.app',
      build:
        'xcodebuild -workspace ios/EternisApp.xcworkspace -scheme EternisApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.emu.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 14' } },
    emulator: {
      type: 'android.emulator',
      device: { avdName: 'Pixel_6_API_34' },
    },
  },
  configurations: {
    'ios.sim.debug': { device: 'simulator', app: 'ios.sim.debug' },
    'android.emu.debug': { device: 'emulator', app: 'android.emu.debug' },
  },
};

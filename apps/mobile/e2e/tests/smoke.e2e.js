/* eslint-env detox/detox */
describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('shows the home screen', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});

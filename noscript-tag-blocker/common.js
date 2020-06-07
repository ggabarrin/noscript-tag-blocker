/*
Update icon based on value of `enabled`
*/
async function updateIcon(enabled) {
  browser.browserAction.setIcon({ path: enabled ? 'icons/pen_enabled.svg' : 'icons/pen_disabled.svg' });
}

/*
Get value of the `enabled` key from localStorage
*/
async function getEnabled() {
  let value = await browser.storage.local.get('enabled');
  enabled = value.enabled;
  return enabled;
}

/*
Check localStorage, and set default settings if empty
*/
async function checkStorage() {
  const gettingStoredSettings = browser.storage.local.get();
  await gettingStoredSettings.then(function (storedSettings) {
    if (!storedSettings.enabled) {
      browser.storage.local.set({ enabled: true });
    }
  });
}

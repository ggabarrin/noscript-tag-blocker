/*
Update icon based on value of `enabled`
*/
async function updateIcon(enabled) {
  browser.browserAction.setIcon({
    path: enabled ? 'icons/icon_enabled.svg' : 'icons/icon_disabled.svg',
  });
}

/*
Get value of the `enabled` key from localStorage
*/
async function getEnabled() {
  return browser.storage.local.get('enabled').then((storedObject) => {
    return storedObject.enabled;
  });
}

/*
Check localStorage, and set default settings if empty
*/
async function checkStorage() {
  return browser.storage.local.get().then((storedObject) => {
    if (storedObject.enabled !== undefined) {
      return Promise.resolve();
    }

    return browser.storage.local.set({ enabled: true });
  });
}

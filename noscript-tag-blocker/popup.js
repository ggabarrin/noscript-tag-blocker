/*
Update checkbox based on value of `enabled`
*/
async function updateCheckbox(enabled) {
  document.getElementById('enabledCheckbox').checked = enabled;
}

/*
Change value of `enabled` and udpate checkbox and icon accordingly
*/
async function featureToogle() {
  const enabled = !(await getEnabled());

  browser.storage.local.set({ enabled });
  await updateCheckbox(enabled);
  await updateIcon(enabled);
}

/*
On load, retrieve settings, and set icon and toggle.
*/
async function load() {
  const enabled = await getEnabled();

  await updateCheckbox(enabled);
  await updateIcon(enabled);

  // Add event on feature toggle
  document
    .getElementById('enabledCheckbox')
    .addEventListener('click', featureToogle, false);
}

document.addEventListener('DOMContentLoaded', load, false);

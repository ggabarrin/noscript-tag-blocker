async function listener(details) {
  let enabled = await getEnabled();
  if (enabled) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder('utf-8');
    let encoder = new TextEncoder();

    let blockedTags = 0;

    filter.onstart = (event) => {
      // console.log("started");
    };

    filter.ondata = (event) => {
      // console.log("receiving data");
      let str = decoder.decode(event.data, { stream: true });

      // replace tags
      str = str.replace(
        /<noscript/g,
        '<textarea style="display: none;" noscript-tag-blocker',
      );
      str = str.replace(/<\/noscript/g, '</textarea');

      // count blocked tags
      blockedTags +=
        str.split('<textarea style="display: none;" noscript-tag-blocker').length - 1;

      filter.write(encoder.encode(str));
    };

    filter.onstop = (event) => {
      // console.log("finished");
      filter.disconnect();

      // set badge text with number of blocked tags in the current tab
      if (blockedTags) {
        browser.browserAction.setBadgeText({
          text: blockedTags.toString(),
          tabId: details.tabId,
        });
      }
    };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: ['<all_urls>'],
    types: ['main_frame'],
  },
  ['blocking'],
);

async function startup() {
  // Check localStorage, and set default settings if empty
  await checkStorage();

  // Set icon based on `enabled` setting
  let enabled = await getEnabled();
  updateIcon(enabled);
}

startup();

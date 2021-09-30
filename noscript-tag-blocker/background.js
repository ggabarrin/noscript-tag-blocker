async function listener(details) {
  if (await getEnabled()) {
    const filter = browser.webRequest.filterResponseData(details.requestId);
    const encoder = new TextEncoder();

    let data = [];

    filter.ondata = (event) => {
      data.push(event.data);
    };

    filter.onstop = async (event) => {
      const blob = new Blob(data);
      const text = await blob.text();

      // do not apply any changes to data if it does not include a noscript tag
      if (!text.match(/<noscript/g)) {
        filter.write(await blob.arrayBuffer());
        filter.close();
        return;
      }

      // replace tags
      const processedText = text
        .replace(/<noscript/ig, '<textarea style="display: none !important;" noscript-tag-blocker')
        .replace(/<\/noscript/ig, '</textarea');

      // count blocked tags
      const blockedTags =
        processedText.split('<textarea style="display: none !important;" noscript-tag-blocker')
          .length - 1;

      filter.write(encoder.encode(processedText));

      // set badge text with number of blocked tags in the current tab
      if (blockedTags) {
        browser.browserAction.setBadgeText({
          text: blockedTags.toString(),
          tabId: details.tabId,
        });
      }

      filter.close();
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
  updateIcon(await getEnabled());
}

startup();

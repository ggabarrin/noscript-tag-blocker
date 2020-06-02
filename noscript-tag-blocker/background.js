function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.onstart = event => {
    // console.log("started");
  }

  filter.ondata = event => {
    // console.log("receiving data");
    let str = decoder.decode(event.data, { stream: true });
    str = str.replace(/<noscript/g, '<textarea style="display: none;" noscript-tag-blocker');
    str = str.replace(/<\/noscript/g, '</textarea');
    filter.write(encoder.encode(str));
  }

  filter.onstop = event => {
    // console.log("finished");
    filter.disconnect();
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: [
      "<all_urls>"
    ],
    types: ["main_frame",]
  },
  ["blocking",]
);

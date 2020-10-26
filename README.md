<h1 align="center">
  <sub>
    <img src="https://raw.githubusercontent.com/ggabarrin/noscript-tag-blocker/master/noscript-tag-blocker/icons/icon.svg" width="48" height="48" alt="icon">
  </sub>
  <sup>
    noscript-tag-blocker
  </sup>
</h1>
<p align="center">
    A Firefox WebExtension for blocking &lt;noscript&gt; tags.
</p>

---

**Note**: _This extension is built using the WebExtensions API for cross-browser compatibility. However, it uses the [webRequest.filterResponseData()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData) function, which is currently only supported by Firefox._

## Build

1. Clone this repository

```sh
git clone https://github.com/ggabarrin/noscript-tag-blocker.git
```

2. Install dependencies

```sh
yarn install --dev
```

3. Build!

This command will create the zip file you need to install in the browser

```sh
yarn build
```

4. A zip file should have been created in the `noscript-tag-blocker/dist` directory

## Deploy

In order to permanently install in Firefox, please follow these steps:

1. Open Firefox
2. Go to `about:config` and set the `xpinstall.signatures.required` key to `false` (this will allow you to install unsigned extensions)
3. Go to `about:addons`, click on the :gear: icon, and click on `Install Add-on From File...` option
4. In case you are building the plugin yourself, select the built zip file, which is located by default in the `noscript-tag-blocker/dist` directory. If not, you may download an already built zip file from the [Releases](https://github.com/ggabarrin/noscript-tag-blocker/releases) page.
5. You should see the extension's icon in your browser's toolbar

## Test

The following command allows you to install temporarily the browser plugin on Firefox for testing.

```sh
yarn test
```

## How does it work?

This extension uses the [webRequest.filterResponseData()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData) function, which allows to modify the HTTP responses before they are rendered by the browser.

Specifically, it replaces the [<noscript>](https://www.w3schools.com/TAGs/tag_noscript.asp) tags with hidden [<textarea>](https://www.w3schools.com/tags/tag_textarea.asp) tags, avoiding the alternate content to be displayed.

### Browser without noscript-tag-blocker

```html
<noscript>
  <p>This is a test</p>
</noscript>
```

### Browser with noscript-tag-blocker

```html
<textarea style="display: none;" noscript-tag-blocker="">
    &lt;p&gt;This is a test&lt;/p&gt;
</textarea>
```

## Acknowledgments

This project is based on Mozilla Developer Network's [http-response](https://github.com/mdn/webextensions-examples/tree/master/http-response) WebExtensions example.

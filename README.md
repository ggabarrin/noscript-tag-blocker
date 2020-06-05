# noscript-tag-blocker

`noscript-tag-blocker` is a Firefox WebExtension for blocking <noscript> tags. 

**Note**: *This extension is built using the WebExtensions API for cross-browser compatibility. However, it currently uses the [webRequest.filterResponseData()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData) function, which at moment is only supported by Firefox.*

## Building 

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

In order to permanently install in Firefox, please follow this step:

1. Open Firefox
2. Go to `about:config` and set the `xpinstall.signatures.required` key to `false` (this will allow you to install unsigned extensions)
3. Go to `about:addons`, click on the :gear: icon, and click on `Install Add-on From File...` option
4. Select the zip file built before (located in the `noscript-tag-blocker/dist` directory)
5. You should see a :fountain_pen: icon in your browser's toolbar

## Test 

The following command allows you to install temporarily the browser plugin on Firefox for testing. 

```sh
yarn test
```

## How does it work?

This extension uses the [webRequest.filterResponseData()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData) function, which modifies the HTTP responses before they are rendered by the browser. 

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

Icon is from: https://www.iconfinder.com/icons/763339/draw_edit_editor_pen_pencil_tool_write_icon#size=128

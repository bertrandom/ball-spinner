# ball-spinner

Light-weight OAuth authenticated Flickr API client for browsers

## warning

Using this will expose your Flickr API key, secret, and OAuth credentials to the end-user. Ideally you should make the API calls on the server-side proxied from the client-side to protect your secrets. This is intended for prototyping, hack days, and internal networks.

Seriously though, if you ignore this warning - best case scenario someone will hijack your Flickr API key for abuse/spam. Worst case scenario they delete all your photos. (The example API keys, secrets, and tokens below are fake).

## usage

Copy `bs.min.js` from the `build` directory to your project and add it as an external script in your HTML.

```
<script src="/js/bs.min.js"></script>
```

Initialize BallSpinner with your API key, secret, and OAuth token. [flickr-oauth-dance](https://www.npmjs.com/package/flickr-oauth-dance) can easily generate these from the command line.

```
var bs = new BallSpinner({
  "api_key": "3eda09cb562caa5859dcbf6062ca9b7d",
  "api_secret": "b8f5c7f9d37a7e65",
  "access_token": "72157649904431428-4cb322030200ac38",
  "access_token_secret": "bbd90fb171b1c946"
});
```

Call the Flickr API method with the required params.

```
bs.call({
  method: 'flickr.photos.getInfo',
  photo_id: 16399059040
}, function(err, response) {
  console.log(response);
});
```

### bs.call(params, callback)

`params` is an object with the arguments for the API method. It should also include a `method` key with the method name.

callback is `function(err, response)` where response is the parsed JSON response from the API.

## compile

Install UglifyJS
```
npm install
```

Build

```
npm run-script build
```

## notes

If you're already using jsSHA in your project, you should only minify ball-spinner.js

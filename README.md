# ball-spinner

Light-weight OAuth authenticated Flickr API client for browsers

## usage

Copy `bs.min.js` to your project and add it as an external script in your HTML.

```
<script src="/js/bs.min.js"></script>
```

Initialize BallSpinner with your API key, secret, and OAuth token.

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

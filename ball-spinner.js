(function(global){

	var BallSpinner = function(config) {
		this.config = config;
	};

	BallSpinner.prototype.call = function(apiParams, callback) {

		var firstParam;

		var params = {
			oauth_consumer_key: this.config.api_key,
			oauth_version: '1.0',
			oauth_signature_method: 'HMAC-SHA1',
			oauth_token: this.config.access_token,
			format: 'json',
			nojsoncallback: 1
		};

		for (var apiParamKey in apiParams) {
			params[apiParamKey] = apiParams[apiParamKey];
		}

		params.oauth_timestamp = Math.round((new Date()).getTime() / 1000.0);

		var nonceObj = new jsSHA('SHA-1', 'TEXT');
		nonceObj.update((new Date()).getTime().toString());
		params.oauth_nonce = nonceObj.getHash('HEX');

		var baseString = 'GET' + '&' + encodeURIComponent('https://api.flickr.com/services/rest/') + '&';

		firstParam = true;
		Object.keys(params).sort().forEach(function(key) {

			if (!firstParam) {
				baseString += encodeURIComponent('&');		
			}

			baseString += encodeURIComponent(key + '=' + params[key]);
			firstParam = false;

		});

		var signingKey = this.config.api_secret + "&" + this.config.access_token_secret;

		var shaObj = new jsSHA('SHA-1', 'TEXT');
		shaObj.setHMACKey(signingKey, 'TEXT');
		shaObj.update(baseString);
		var hmac = shaObj.getHMAC('B64');

		params.oauth_signature = hmac;

		var url = 'https://api.flickr.com/services/rest/';
		
		firstParam = true;
		for (var key in params) {

			if (firstParam) {
				url += '?';
			} else {
				url += '&';
			}

			url += key + '=' + encodeURIComponent(params[key]);
			firstParam = false;

		}

		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {

			var data;

			if (this.status === 200) {

				try {
					data = JSON.parse(this.response);				
				} catch (e) {
					callback(new Error('Failed to parse JSON response'));
					return;
				}

				callback(null, data);

			} else {

				callback(new Error('API call failed with non-200 status code'));

			}

		};

		request.onerror = function() {
			callback(new Error('API call failed, error from XMLHttpRequest'));
		};

		request.send();

	};

	global.BallSpinner = BallSpinner;

})(this);
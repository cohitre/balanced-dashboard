Balanced.UrlStringUtilities = {
	queryStringToObject: function(string) {
		var results = {};
		if (string === undefined) {
			return undefined;
		}
		var queryString = string.split("?")[1];
		if (queryString === undefined) {
			return undefined;
		}

		queryString
			.split("&")
			.forEach(function(str) {
				var pair = str.split("=").map(function(s) {
					return window.decodeURIComponent(s);
				});
				results[pair[0]] = pair[1];
			});

		return results;
	},
	objectToQueryString: function(attributes) {
		if (attributes === undefined) {
			return undefined;
		}

		return $.map(attributes, function(v, k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(v);
		}).join('&');
	},
};

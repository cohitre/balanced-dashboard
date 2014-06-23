Balanced.ResultsLoader = Ember.Object.extend({
	resultsUri: function() {
		return this.get('path') + "?" + this.get('queryString');
	}.property("path", "queryString"),

	queryString: function() {
		var filteringParams = this.get("queryStringArguments");
		return $.map(filteringParams, function(v, k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(v);
		}).join('&');
	}.property("queryStringArguments"),

	results: function() {
		var uri = this.get('resultsUri');
		var type = this.get('resultsType');
		return Balanced.SearchModelArray.newArrayLoadedFromUri(uri, type);
	}.property("resultsUri", "resultsType")
});

Balanced.TransactionsResultsLoader = Balanced.ResultsLoader.extend({
	resultsType: Balanced.Transaction,
	path: "/transactions",

	queryStringArguments: function() {
		var attributes = {
			limit: 50,
			sort: "created_at,desc",
			q: "",
			"status[in]": "failed,succeeded,pending",
			"type[in]": "debit,credit,hold,refund"
		};
		var startTime = this.get("startTime");
		var endTime = this.get("endTime");

		if (startTime) {
			attributes['created_at[>]'] = startTime.toDate().toISOString();
		}

		if (endTime) {
			attributes['created_at[<]'] = endTime.toDate().toISOString();
		}
		return attributes;
	}.property("startTime", "endTime"),
});

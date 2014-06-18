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

	startTime: function() {
		console.log(this.get("marketplace.created_at"));
		return this.get("marketplace.created_at");
	}.property(),

	endTime: function() {
		return moment().add('days', 2);
	}.property(),

	queryStringArguments: function() {
		return {
			limit: 50,
			sort: "created_at,desc",
			q: "",
			sort: "created_at,desc",
			"status[in]": "failed,succeeded,pending",
			"type[in]": "debit,credit,hold,refund"
		};
	}.property(),
});

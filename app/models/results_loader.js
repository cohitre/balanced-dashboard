Balanced.ResultsLoader = Ember.Object.extend({
	limit: 50,
	sort: function() {
		return this.get("sortField") + "," + this.get("sortDirection");
	}.property("sortField", "sortDirection"),
	sortField: "created_at",
	sortDirection: "desc",

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
	}.property("resultsUri", "resultsType"),

	queryStringArguments: function() {
		var attributes = {
			limit: this.get("limit"),
			sort: this.get("sort"),
			offset: 0,
		};
		var setFilterKey = function(keyRoot, array) {
			if (array === undefined || array.length === 0) {
				return;
			} else if (array.length === 1) {
				attributes[keyRoot] = array.join(",");
			} else {
				attributes[keyRoot + "[in]"] = array.join(",");
			}
		};

		setFilterKey("type", this.get("typeFilters"));
		setFilterKey("status", this.get("statusFilters"));
		setFilterKey("method", this.get("methodFilters"));

		var startTime = this.get("startTime");
		var endTime = this.get("endTime");

		if (startTime) {
			attributes['created_at[>]'] = startTime.toDate().toISOString();
		}

		if (endTime) {
			attributes['created_at[<]'] = endTime.toDate().toISOString();
		}

		if (this.get("searchQuery") !== undefined) {
			attributes.q = this.get("searchQuery");
		}

		return attributes;
	}.property("sort", "startTime", "endTime", "typeFilters", "statusFilters", "limit")
});

Balanced.TransactionsResultsLoader = Balanced.ResultsLoader.extend({
	resultsType: Balanced.Transaction,
	path: Ember.computed.oneWay("marketplace.transactions_uri"),
	typeFilters: ["debit", "credit", "hold", "refund"],
	statusFilters: ["failed", "succeeded", "pending"],
});

Balanced.CustomersResultsLoader = Balanced.ResultsLoader.extend({
	resultsType: Balanced.Customer,
	path: Ember.computed.oneWay("marketplace.customers_uri"),
});

Balanced.DisputesResultsLoader = Balanced.ResultsLoader.extend({
	resultsType: Balanced.Dispute,
	path: Ember.computed.oneWay("marketplace.disputes_uri"),
	sort: "initiated_at,desc",
	typeFilters: ["debit"],
});

Balanced.LogsResultsLoader = Balanced.ResultsLoader.extend({
	resultsType: Balanced.Log,
	path: "/logs",
	methodFilters: ["post", "put", "delete"]
});

Balanced.SearchResultsLoader = Balanced.ResultsLoader.extend({
	path: function() {
		return this.get("marketplace.uri") + "/search";
	}.property("marketplace.uri"),
});

Balanced.FundingInstrumentsResultsLoader = Balanced.SearchResultsLoader.extend({
	resultsType: Balanced.FundingInstrument,
	typeFilters: ["bank_account", "card"]
});

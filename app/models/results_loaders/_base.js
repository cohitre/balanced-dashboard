Balanced.ResultsLoader = Ember.Object.extend({
	limit: 50,
	sort: function() {
		return this.get("sortField") + "," + this.get("sortDirection");
	}.property("sortField", "sortDirection"),

	setSortField: function(field) {
		var oldValue = this.get("sortField");
		var direction = "desc";
		if (field === oldValue) {
			direction = this.get("sortDirection") === "asc" ?
				"desc" :
				"asc";
		}
		this.setProperties({
			sortDirection: direction,
			sortField: field
		});
	},

	sortDirection: "desc",
	sortField: "created_at",

	resultsUri: function() {
		var path = this.get("path");
		var query = this.get("queryStringArguments");
		return Balanced.Utils.buildUri(path, query);
	}.property("path", "queryStringArguments"),

	queryString: function() {
		return Balanced.Utils.objectToQueryString(this.get("queryStringArguments"));
	}.property("queryStringArguments"),

	results: function() {
		var uri = this.get('resultsUri');
		var type = this.get('resultsType');
		return Balanced.SearchModelArray.newArrayLoadedFromUri(uri, type);
	}.property("resultsUri", "resultsType"),

	isLoading: Ember.computed.not("results.isLoaded"),

	queryStringArguments: function() {
		var queryStringBuilder = new Balanced.ResultsLoaderQueryStringBuilder();

		queryStringBuilder.addValues({
			limit: this.get("limit"),
			sort: this.get("sort"),

			type: this.get("typeFilters"),
			status: this.get("statusFilters"),
			method: this.get("methodFilters"),
			endpoint: this.get("endpointFilters"),
			status_rollup: this.get("statusRollupFilters"),

			"created_at[>]": this.get("startTime"),
			"created_at[<]": this.get("endTime"),

			q: this.get("searchQuery")
		});

		return queryStringBuilder.getQueryStringAttributes();
	}.property("sort", "startTime", "endTime", "typeFilters", "statusFilters", "endpointFilters", "statusRollupFilters", "limit"),

	getCsvExportType: function() {
		return this.get("resultsType") === Balanced.Dispute ?
			"disputes" :
			"transactions";
	},

	postCsvExport: function(emailAddress) {
		var download = Balanced.Download.create({
			uri: "/v1" + this.get("resultsUri"),
			email_address: emailAddress,
			type: this.getCsvExportType()
		});
		return download.save();
	}
});
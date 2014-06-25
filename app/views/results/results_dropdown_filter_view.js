Balanced.ResultsDropdownFilterView = Balanced.View.extend({
	templateName: "results/results_dropdown_filter",
	classNameBindings: [":dropdown", ":filter"],

	actions: {
		setFilter: function(value) {
			var model = this.get("model");
			model.set(this.get("filter"), value);
		}
	}
});

Balanced.TransactionTypesResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Type",
	filter: "typeFilters",
	filters: function() {
		var filters = [];
		var addFilter = function(text, value) {
			filters.push({
				value: value.split(","),
				text: text
			});
		};

		addFilter("All", "debit,credit,hold,refund");
		addFilter("Holds", "hold");
		addFilter("Debits", "debit");
		addFilter("Credits", "credit");
		addFilter("Refunds", "refund");
		addFilter("Reversals", "reversal");

		return filters;
	}.property(),
});

Balanced.TransactionStatusResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Status",
	filter: "statusFilters",
	filters: function() {
		var filters = [];
		var addFilter = function(text, value) {
			filters.push({
				value: value.split(","),
				text: text
			});
		};

		addFilter("All", "pending,succeeded,failed");
		addFilter("Pending", "pending");
		addFilter("Succeeded", "succeeded");
		addFilter("Failed", "failed");

		return filters;
	}.property(),
});

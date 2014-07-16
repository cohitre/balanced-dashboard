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

var defineFilter = function(text, value) {
	return {
		value: value,
		text: text
	};
};

Balanced.TransactionsTypeResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Type",
	filters: function() {
		return [
			defineFilter("All", "transaction", true),
			defineFilter("Credits", "credit"),
			defineFilter("Debits", "debit"),
			defineFilter("Holds", "hold"),
			defineFilter("Refunds", "refund"),
			defineFilter("Reversals", "reversal")
		];
	}.property(),

	actions: {
		setFilter: function(filterLink) {
			var controller = this.get('controller');
			controller.send('changeTypeFilter', filterLink.value);
			this.toggleSelected(filterLink);
		}
	}
});

Balanced.TransactionsStatusResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Status",
	filters: function() {
		return [
			defineFilter("All", "all", true),
			defineFilter("Pending", "pending"),
			defineFilter("Succeeded", "succeeded"),
			defineFilter("Failed", "failed")
		];
	}.property(),

	actions: {
		setFilter: function(filterLink) {
			var controller = this.get('controller');
			controller.send('changeStatusFilter', filterLink.value);
			this.toggleSelected(filterLink);
		}
	}
});

Balanced.PaymentMethodsResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Payment method",
	filters: function() {
		return [
			defineFilter("All", ["funding_instrument"], true),
			defineFilter("Card", ["card"]),
			defineFilter("Bank accounts", ["bank_account"])
		];
	}.property(),

	actions: {
		setFilter: function(filterLink) {
			var controller = this.get('controller');
			controller.send('changePaymentMethodFilter', filterLink.value);
			this.toggleSelected(filterLink);
		}
	}
});

Balanced.DisputesStatusResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Status",
	filters: function() {
		return [
			defineFilter("All", Balanced.SEARCH.DISPUTE_TYPES, true),
			defineFilter("Pending", ["pending"]),
			defineFilter("Won", ["won"]),
			defineFilter("Lost", ["lost"]),
			defineFilter("Arbitration", ["arbitration"])
		];
	}.property(),

	actions: {
		setFilter: function(filterLink) {
			var controller = this.get('controller');
			controller.send('changeDisputeStatusFilter', filterLink.value);
			this.toggleSelected(filterLink);
		}
	}
});

Balanced.LogsEndpointResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Endpoint",
	filter: "endpointFilters",
	filters: function() {
		return [
			defineFilter("All", undefined),
			defineFilter("Debits", ["debits"]),
			defineFilter("Credits", ["credits"]),
			defineFilter("Refunds", ["refunds"]),
			defineFilter("Holds", ["holds"]),
			defineFilter("Customers", ["customers"]),
			defineFilter("Accounts", ["accounts"]),
			defineFilter("Bank accounts", ["bank_accounts"]),
			defineFilter("Cards", ["Cards"]),
			defineFilter("Verifications", ["verifications"])
		];
	}.property(),
});

Balanced.LogsStatusResultsDropdownFilterView = Balanced.ResultsDropdownFilterView.extend({
	toggleText: "Status",
	filter: "statusRollupFilters",
	filters: function() {
		return [
			defineFilter("All", undefined),
			defineFilter("Succeeded", ["2xx"]),
			defineFilter("Failed", ["3xx", "4xx", "5xx"])
		];
	}.property(),
});

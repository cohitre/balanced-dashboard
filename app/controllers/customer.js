Balanced.CustomerController = Balanced.ObjectController.extend({
	needs: ['marketplace'],

	detailsSectionViews: function() {
		return Balanced.getSectionViews("customer/details");
	}.property("model"),

	actions: {
		changeDateFilter: function(startTime, endTime) {
			this.get("transactionsResultsLoader").setProperties({
				endTime: endTime,
				startTime: startTime
			});
		},

		changeTypeFilter: function(type) {
			if (type === "transaction") {
				type = null;
			}
			this.set("transactionsResultsLoader.type", type);
		},

		changeTransactionsSort: function(column) {
			this.get("transactionsResultsLoader").setSortField(column);
		},

		changeStatusFilter: function(status) {
			if (status === "all") {
				status = null;
			}
			this.set("transactionsResultsLoader.status", status);
		},

		changeDisputeStatusFilter: function(status) {
			this.set('disputesResultsLoader.statusFilters', status);
		},
		changeDisputesSort: function(column) {
			this.get("disputesResultsLoader").setSortField(column);
		},

		changePaymentMethodFilter: function(method) {
			this.set("fundingInstrumentsResultsLoader.type", method);
		},

		toggleDrawer: function(className) {
			$('.' + className).slideToggle(200);
		}
	}
});

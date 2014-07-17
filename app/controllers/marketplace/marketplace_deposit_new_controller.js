Balanced.MarketplaceDepositNewController = Balanced.Controller.extend({
	creditCardYears: function() {
		var startYear = new Date().getFullYear();
		return _.times(15, function(i) {
			var year = startYear + i;
			return year;
		});
	}.property(),
	creditCardMonths: Balanced.TIME.MONTHS,
	initialAmounts: function() {
		return _.map([10, 25, 50, 100], function(amount) {
			return {
				value: "" + amount,
				label: Balanced.Utils.formatCurrency(amount * 100)
			};
		});
	}.property(),

	actions: {
		save: function(model) {
			var self = this;
			model.validate();
			if (model.get("isValid")) {
				model.save().then(function(debit) {
					self.transitionToRoute(debit.get("route_name"), debit);
				});
			}
		}
	}
});

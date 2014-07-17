Balanced.MarketplaceDepositNewController = Balanced.Controller.extend({
	creditCardYears: function() {
		var startYear = new Date().getYear();
		return _.times(15, function(i) {
			var year = startYear + i;
			return {
				label: year,
				value: year
			};
		})
	},
	initialAmounts: function() {
		return _.map([10, 25, 50, 100], function(amount) {
			return {
				value: amount,
				label: Balanced.Utils.formatCurrency(amount * 100)
			};
		});
	}.property(),
});

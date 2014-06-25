Balanced.MarketplaceFundingInstrumentsRoute = Balanced.AuthRoute.extend({
	pageTitle: 'Payment methods',
	model: function() {
		var marketplace = this.modelFor("marketplace");
		return Balanced.FundingInstrumentsResultsLoader.create({
			marketplace: marketplace
		});
	},
});

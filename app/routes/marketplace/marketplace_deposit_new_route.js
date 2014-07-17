Balanced.MarketplaceDepositNewRoute = Balanced.AuthRoute.extend({
	pageTitle: 'Make an initial deposit',
	model: function() {
		return Balanced.InitialDepositTransactionFactory.create();
	}
});

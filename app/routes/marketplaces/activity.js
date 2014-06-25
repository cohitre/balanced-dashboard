Balanced.ActivityRoute = Balanced.AuthRoute.extend({
	defaultSort: 'created_at',
	controllerName: 'activity',

	setupController: function(controller, model) {
		this._super(controller, model);

		var activityController = this.controllerFor(this.get('controllerName'));
		var defaultSort = this.get('defaultSort');
		if (defaultSort && defaultSort !== activityController.get('sortField')) {
			activityController.set('sortField', defaultSort);
		}

		var defaultType = this.get('defaultType');
		if (!defaultType) {
			return;
		}

		if (activityController.get('category') !== defaultType) {
			activityController.set('type', defaultType);
		}
	}
});

Balanced.ActivityOrdersRoute = Balanced.ActivityRoute.extend({
	pageTitle: 'Orders',
	defaultType: 'order',
	controllerName: 'activity_orders'
});

Balanced.ActivityTransactionsRoute = Balanced.ActivityRoute.extend({
	pageTitle: 'Transactions',
	defaultType: 'transaction',
	controllerName: 'activity_transactions'
});

Balanced.ActivityIndexRoute = Balanced.RedirectRoute('marketplace.transactions');
Balanced.MarketplaceRedirectActivityTransactionsRoute = Balanced.RedirectRoute("marketplace.transactions");
Balanced.MarketplaceRedirectActivityOrdersRoute = Balanced.RedirectRoute("orders");
Balanced.MarketplaceRedirectActivityCustomersRoute = Balanced.RedirectRoute('marketplace.customers');
Balanced.MarketplaceRedirectActivityFundingInstrumentsRoute = Balanced.RedirectRoute('marketplace.funding_instruments');
Balanced.MarketplaceRedirectActivityDisputesRoute = Balanced.RedirectRoute('marketplace.disputes');

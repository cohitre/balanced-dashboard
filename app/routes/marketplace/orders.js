import AuthRoute from "../auth";

var MarketplaceOrdersRoute = AuthRoute.extend({
	pageTitle: 'Orders',
	model: function() {
		var marketplace = this.modelFor("marketplace");
		return marketplace.getTransactionsLoader();
	},
});

export default MarketplaceOrdersRoute;

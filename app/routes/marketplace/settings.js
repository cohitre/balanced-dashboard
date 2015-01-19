import AuthRoute from "../auth";

var MarketplaceSettingsRoute = AuthRoute.extend({
	pageTitle: 'Settings',
	setupController: function(controller, model) {
		var store = this.controllerFor("marketplace").getStore();
		this._super(controller, model);
		store.fetchCollection("api-key", "/api_keys", { limit: 3 }).then(function(apiKeys) {
			controller.set("apiKeysCollection", apiKeys);
		});
	}
});

export default MarketplaceSettingsRoute;

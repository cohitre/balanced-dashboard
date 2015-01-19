import Ember from "ember";
import AuthRoute from "../auth";

var MarketplaceSettingsRoute = AuthRoute.extend({
	pageTitle: 'Settings',
	setupController: function(controller, model) {
		var marketplaceController = this.controllerFor("marketplace");
		var store = marketplaceController.getStore();
		var userApiKeys = this.container.lookup("user:main").user_marketplace_for_id(marketplaceController.get("id")).get("keys");

		this._super(controller, model);

		store.fetchCollection("api-key", "/api_keys", { limit: 3 }).then(function(apiKeys) {
			apiKeys.forEach(function(apiKey) {
				var href = "/v1" + apiKey.get("href");
				var userApiKey = userApiKeys.findBy("uri", href);
				if (userApiKey) {
					apiKey.set("secret", Ember.get(userApiKey, "secret"));
				}
			});
			controller.set("apiKeysCollection", apiKeys);
		});
	},
});

export default MarketplaceSettingsRoute;

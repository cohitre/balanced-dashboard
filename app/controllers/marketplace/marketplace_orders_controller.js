Balanced.MarketplaceOrdersController = Balanced.ObjectController.extend(Ember.Evented, {
	needs: ["marketplace"],
	resultsLoader: Ember.computed.oneWay("model"),
});

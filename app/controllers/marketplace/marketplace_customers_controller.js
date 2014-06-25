Balanced.MarketplaceCustomersController = Balanced.ObjectController.extend(Ember.Evented, {
	needs: ['marketplace'],
	resultsLoader: Ember.computed.oneWay("model"),
});

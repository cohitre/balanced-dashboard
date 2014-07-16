Balanced.MarketplaceBankAccountNewRoute = Ember.Route.extend({
	pageTitle: 'Create a bank account',
	model: function() {
		return Balanced.MarketplaceBankAccountFactory.create();
	}
});

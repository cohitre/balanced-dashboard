Balanced.CardsIndexRoute = Balanced.RedirectRoute('activity.funding_instruments');

Balanced.CardsRoute = Balanced.AuthRoute.extend({
	title: 'Card',
	model: function(params) {
		var mp = this.modelFor("marketplace");

		var modelUri = Balanced.Utils.combineUri(mp.get("cards_uri"), params.item_id);
		return Balanced.Card.find(modelUri);
	},
	modelObject: Balanced.Card,
	marketplaceUri: 'cards_uri'
});

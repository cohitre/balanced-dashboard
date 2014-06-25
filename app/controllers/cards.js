var Events = Balanced.ActionEvented('openDebitFundingInstrumentModal', 'openCreditFundingInstrumentModal', 'openHoldCardModal');

Balanced.CardsController = Balanced.ObjectController.extend(Events, {
	needs: ['marketplace'],

	transactionsResultsLoader: function() {
		return Balanced.TransactionsResultsLoader.create({
			marketplace: this.get("marketplace"),
			path: this.get("model.transactions_uri")
		});
	}.property("model"),
});

require("./transaction_factory");

var handleResponse = function(model, errorsList) {
	var validationErrors = model.get("validationErrors");
	validationErrors.clear();

	if (Ember.isArray(errorsList)) {
		_.each(errorsList, function(error) {
			validationErrors.add("", "serverError", null, error.description);
		});
	} else {
		_.each(errorsList, function(error, attribute) {
			validationErrors.add(attribute, "serverError", null, error);
		});
	}
};

var ValidationHelpers = Balanced.ValidationHelpers;

Balanced.CardDebitBaseTransactionFactory = Balanced.TransactionFactory.extend({
	save: function() {
		var deferred = Ember.RSVP.defer();
		var self = this;
		var card = Balanced.Card.create(this.getDestinationAttributes());
		card
			.tokenizeAndCreate()
			.then(function(card) {
				var debitAttributes = _.extend(self.getDebitAttributes(), {
					uri: card.get('debits_uri'),
					source_uri: card.get('uri')
				});
				return Balanced.Debit.create(debitAttributes).save();
			})
			.then(function(debit) {
				deferred.resolve(debit);
			}, function(errors) {
				handleResponse(self, errors);
				deferred.reject();
			});
		return deferred.promise;
	}
});

Balanced.DebitExistingFundingInstrumentTransactionFactory = Balanced.TransactionFactory.extend({
	source_uri: Ember.computed.readOnly("source.uri"),
	getDebitAttributes: function() {
		var properties = this.getProperties("amount", "appears_on_statement_as", "description", "source_uri");
		properties.uri = this.get("source.debits_uri");
		return properties;
	},

	save: function() {
		return Balanced.Debit.create(this.getDebitAttributes()).save();
	},
});

Balanced.DebitExistingBankAccountTransactionFactory = Balanced.DebitExistingFundingInstrumentTransactionFactory.extend({
	validations: {
		dollar_amount: ValidationHelpers.positiveDollarAmount,
		appears_on_statement_as: ValidationHelpers.bankTransactionAppearsOnStatementAs,

		source_uri: {
			presence: true
		}
	}
});

Balanced.DebitExistingCardTransactionFactory = Balanced.DebitExistingFundingInstrumentTransactionFactory.extend({
	validations: {
		dollar_amount: ValidationHelpers.positiveDollarAmount,
		appears_on_statement_as: ValidationHelpers.cardTransactionAppearsOnStatementAs,

		source_uri: {
			presence: true
		}
	}
});

Balanced.CardDebitTransactionFactory = Balanced.CardDebitBaseTransactionFactory.extend({
	getDestinationAttributes: function() {
		var attributes = this.getProperties("name", "number", "cvv", "expiration_month", "expiration_year");
		attributes.address = {
			postal_code: this.get("postal_code")
		};
		return attributes;
	},

	getDebitAttributes: function() {
		return this.getProperties("amount", "appears_on_statement_as", "description");
	},

	validations: {
		dollar_amount: ValidationHelpers.positiveDollarAmount,
		appears_on_statement_as: ValidationHelpers.cardTransactionAppearsOnStatementAs,

		name: ValidationHelpers.cardName,
		number: ValidationHelpers.cardNumber,
		cvv: ValidationHelpers.cardCvv,
		expiration_date: ValidationHelpers.cardExpirationDate,
	}
});

Balanced.InitialDepositTransactionFactory = Balanced.CardDebitBaseTransactionFactory.extend({
	card_uri: Ember.computed.oneWay("marketplace.owner_customer.cards_uri"),

	getDestinationAttributes: function() {
		var attributes = this.getProperties("number", "cvv", "expiration_month", "expiration_year");
		_.extend(attributes, {
			uri: this.get("card_uri"),
			address: {
				postal_code: this.get("postal_code")
			}
		});
		return attributes;
	},

	getDebitAttributes: function() {
		return this.getProperties("amount");
	},

	validations: {
		dollar_amount: ValidationHelpers.positiveDollarAmount,
		number: ValidationHelpers.cardNumber,
		cvv: ValidationHelpers.cardCvv,
		expiration_date: ValidationHelpers.cardExpirationDate,
	}
});

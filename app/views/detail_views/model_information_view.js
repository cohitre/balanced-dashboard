Balanced.TitledKeyValuesSectionView = Balanced.View.extend({
	templateName: "detail_views/titled_key_values_section",

	getKeyValueView: function(label, field) {
		var model = this.get("model");
		return Balanced.KeyValueView.create({
			key: label,
			value: model.get(field)
		});
	},

	getLinkedKeyValueView: function(label, field, hrefField) {
		var model = this.get("model");

		return Balanced.LinkedKeyValueView.create({
			key: label,
			value: model.get(field),
			link: model.get(hrefField)
		});
	},
});

Balanced.CustomerTitledKeyValuesSectionView = Balanced.TitledKeyValuesSectionView.extend({
	title: "Customer information",

	titleModalLinkView: function() {
		return Balanced.EditCustomerInfoModalView.create({
			customer: this.get("model")
		});
	}.property("model"),

	keyValueListViews: function() {
		return [
			this.getKeyValueView("Customer ID", "id"),
			this.getKeyValueView("Business Name", "business_name"),
			this.getKeyValueView("EIN", "ein"),
			this.getKeyValueView("Name", "name"),
			this.getKeyValueView("Email", "email"),
			this.getKeyValueView("Address line 1", "address.line1"),
			this.getKeyValueView("Address line 2", "address.line2"),
			this.getKeyValueView("City", "address.city"),
			this.getKeyValueView("State", "address.state"),
			this.getKeyValueView("Postal code", "address.postal_code"),
			this.getKeyValueView("Country", "country_name"),
			this.getKeyValueView("Phone number", "phone"),
			this.getKeyValueView("Date of birth", "dob"),
			this.getKeyValueView("SSN", "ssn_last4"),
			this.getKeyValueView("Country", "country_name"),

			this.getLinkedKeyValueView("Facebook ID", "facebook_id", "facebook_url"),
			this.getLinkedKeyValueView("Twitter ID", "twitter_id", "twitter_url")
		];
	}.property("model")
});
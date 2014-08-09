Balanced.Connections = {};

Balanced.Connections.BaseConnection = Ember.Object.extend({
	settings: function(settings) {
		return settings;
	},

	del: function(url) {
		return this.ajax({
			url: url,
			type: "DELETE"
		});
	},

	post: function(url) {
		return this.ajax({
			url: url,
			type: "POST"
		});
	},

	ajax: function(settings) {
		return $.ajax(this.settings(settings));
	},
});

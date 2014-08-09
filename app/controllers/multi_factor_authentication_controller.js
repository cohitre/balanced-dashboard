Balanced.MultiFactorAuthenticationController = Balanced.Controller.extend({
	connection: function() {
		return Balanced.Connections.AuthConnection.create();
	}.property(),

	user: Ember.computed.oneWay("Balanced.Auth"),

	multiFactorAuthUri: Ember.computed.oneWay("user.multiFactorAuthUri"),

	enableMultiFactorAuthentication: function() {
		var self = this;
		return this.get("connection")
			.post(this.get("multiFactorAuthUri"))
			.then(function(response) {
				self.set("otpSecret", response);
			});
	},

	disableMultiFactorAuthentication: function() {
		var self = this;
		return this.get("connection")
			.del(this.get("multiFactorAuthUri"))
			.then(function() {
				self.get("user").set("otp_enabled", false);
				self.set("otpSecret", null);
			});
	},
});

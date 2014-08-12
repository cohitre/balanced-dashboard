var Full = Balanced.Modals.FullModalMixin;
var Form = Balanced.Modals.FormModalMixin;

Balanced.UserCreateModalView = Balanced.ModalBaseView.extend(Full, Form, {
	templateName: "register_flow/user_create_modal",
	title: "Create your account",

	auth: Balanced.Auth,

	model: function() {
		return Balanced.UserAccountFactory.create();
	}.property(),

	isSaving: false,

	getUserController: function() {
		return this.get("container").lookup("controller:user");
	},

	save: function(model, apiKey) {
		var self = this;
		var userController = this.getUserController();
		this.set("isSaving", true);

		return userController
			.join(model, apiKey)
			.then(function(marketplace) {
				self.set("isSaving", false);
				self.close();
				return Ember.RSVP.resolve(marketplace);
			}, function() {
				self.set("isSaving", false);
				return Ember.RSVP.reject()
			});
	},

	actions: {
		nextStep: function(marketplace) {
			this.get("container")
				.lookup("controller:application")
				.transitionToRoute('marketplace', marketplace);
		},

		save: function() {
			var self = this;
			var model = this.get("model");
			var apiKey = this.get("auth.authToken");
			this.save(model, apiKey)
				.then(function(marketplace) {
					self.send("nextStep", marketplace);
				});
		}
	}
});
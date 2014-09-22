Balanced.Route = Ember.Route.extend();

import AuthRoute from "./auth";
import TitleRoute from "./title";
import ModelRoute from "./model";

Balanced.ModelControllerRoute = ModelRoute.extend({
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.send('reload');
	}
});

Balanced.ControllerRoute = AuthRoute.extend({
	setupController: function(controller, model) {
		controller.send('reload');
	}
});

Balanced.RedirectRoute = function redirectRoute(routeName, modelFor, baseRoute) {
	baseRoute = baseRoute || AuthRoute;
	modelFor = modelFor || 'marketplace';

	return baseRoute.extend({
		redirect: function() {
			this.transitionTo(routeName, this.modelFor(modelFor));
		}
	});
};
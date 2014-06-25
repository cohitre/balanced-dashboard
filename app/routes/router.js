Balanced.Route = Ember.Route.extend({});

Balanced.Router = Ember.Router.extend({
	/*
	 * This function update page title when a transition is made
	 */
	_update_title: function(infos) {
		var last_info = infos[infos.length - 1];
		var title = last_info.handler.title;
		var route = last_info.handler;
		var page_title = route.get('pageTitle');

		// backup document title
		if (typeof this._doc_title === 'undefined') {
			this._doc_title = document.title;
		}

		var self = this;
		var set_title = function(title) {
			if (typeof title !== 'undefined') {
				document.title = self._doc_title + ' | ' + title;
			} else {
				document.title = self._doc_title;
			}
		};

		// try to call it if it is a function
		if (typeof page_title === 'function') {
			/*
			 * The title may be updated by the page_title function later,
			 * for example, ajax data loading page can update the title after the
			 * data is loaded. So, you can return such as 'Customer: loading ...',
			 * and call set_title('Customer: John') later when the data is loaded
			 */
			page_title = page_title(route, set_title);
		}

		set_title(page_title);
	},

	didTransition: function(infos) {
		this._update_title(infos);
		Balanced.Analytics.trackPage(_.pluck(infos, 'name').join('/'));
		return this._super.apply(this, arguments);
	}
});

var objectToRoutes = function(routeMapper, object) {
	_.each(object, function(routePath, routeName) {
		routeMapper.route(routeName, {
			path: routePath
		});
	});
};

Balanced.Router.map(function() {
	// Signup and accounts related
	objectToRoutes(this, {
		login: "/login",
		logout: "/logout",
		forgotPassword: "/forgot_password",
		resetPassword2: '/password/:token',
		resetPassword: '/invite/:token',
		start: "/start",
		claim: "/claim",
		accountSecurity: "/security",
	});

	this.resource('marketplaces', function() {
		this.route('apply');

		this.resource('marketplace', {
			path: '/:marketplace_id'
		}, function() {
			objectToRoutes(this, {
				settings: "/settings",
				add_customer: "/add_customer",
				initial_deposit: "/initial_deposit",
				import_payouts: "/import_payouts",

				transactions: "/transactions",
				customers: "/customers",
				customer: "/customer/:item_id",

				disputes: "/disputes",
				dispute: "/dispute/:item_id",

				funding_instruments: "/payment_methods",

				logs: "/logs",
				log: "/log/:item_id",

				redirect_activity_transaction: '/activity/transactions',
				redirect_activity_orders: '/activity/orders',
				redirect_activity_customers: '/activity/customers',
				redirect_activity_funding_instruments: '/activity/funding_instruments',
				redirect_activity_disputes: '/activity/disputes',
				redirect_invoices: 'invoices'
			});

			this.resource('activity', {
				path: '/'
			}, function() {});
			// exists to handle old URIs for accounts, redirects to the customers page
			this.resource('accounts', {
				path: '/accounts/:item_id'
			});

			this.resource('bank_accounts', {
				path: '/bank_accounts/:item_id'
			});
			this.resource('cards', {
				path: '/cards/:item_id'
			});

			this.resource('credits', {
				path: '/credits/:item_id'
			});
			this.resource('reversals', {
				path: '/reversals/:item_id'
			});
			this.resource('debits', {
				path: '/debits/:item_id'
			});
			this.resource('holds', {
				path: '/holds/:item_id'
			});
			this.resource('refunds', {
				path: '/refunds/:item_id'
			});

			this.resource('events', {
				path: '/events/:item_id'
			});

			this.route('orders');
			this.route('disputes');
			this.resource('orders', {
				path: '/orders/:item_id'
			});

			this.route('invoices', {
				path: '/account_statements'
			});

			this.resource('invoice', {
				path: '/account_statements/:item_id'
			});
		});
	});

	this.route('invalid', {
		path: '*:'
	});
});

var BALANCED_CREATED_AT = Balanced.DATES.CREATED_AT;

var DEFAULT_MAX_TIME = Balanced.DATES.RESULTS_MAX_TIME;
var DEFAULT_MIN_TIME = BALANCED_CREATED_AT;

var DEFAULT_LOCALE = {
	monthNames: moment()._lang._months,
	daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	cancelLabel: false,
	applyLabel: 'Update'
};

Balanced.DatePickerView = Balanced.View.extend({
	templateName: 'date_picker',

	// temporary properties to use for selecting time periods, controller
	// stores the values used for filtering
	minTime: function(key, value, previousValue) {
		if (arguments.length > 1) {
			this.set('controller.minDate', value);
		}
		var minDate = this.get('controller.minDate');
		return minDate || this.get("controller.marketplace.created_at")
		return moment(Balanced.currentMarketplace.get('created_at')).toDate() || DEFAULT_MIN_TIME;
	}.property("controller.minDate"),
	maxTime: Ember.computed.alias("controller.maxDate"),

	format: 'MMM D, YYYY, h:mm a',

	maxDate: function() {
		return moment(this.get('maxTime')).format(this.get('format'));
	}.property('maxTime', 'format'),

	minDate: function() {
		return moment(this.get('minTime')).format(this.get('format'));
	}.property('minTime', 'format'),

	didInsertElement: function() {
		// this.set('maxTime', (this.get('controller.maxDate') || DEFAULT_MAX_TIME).getTime());
		// this.set('minTime', (this.get('controller.minDate') || moment(Balanced.currentMarketplace.get('created_at')).toDate() || DEFAULT_MIN_TIME).getTime());
		var self = this;
		Ember.run.scheduleOnce('afterRender', function() {
			self.bindDatePicker();
		});
		//this._changeDateFilter('');

		this._super();
	},

	willDestroyElement: function() {
		var dateRangePicker = this.$('.datetime-picker').data('daterangepicker');
		if (!dateRangePicker) {
			return;
		}

		dateRangePicker.remove();

		this._super();
	},

	bindDatePicker: function() {
		var attributes = {
			endDate: moment(this.get('endDate')),
			startDate: moment(this.get('startDate')),
			locale: DEFAULT_LOCALE,
			timePicker: false,
			format: 'MMM D, YYYY',
			minDate: BALANCED_CREATED_AT,
			maxDate: moment().add('days', 2),
			parentEl: '.ember-application'
		};

		this.$('.datetime-picker')
			.daterangepicker(attributes, _.bind(this.chooseDateTime, this))
			.on('apply.daterangepicker', _.bind(this.applyDateTime, this));
	},

	applyDateTime: function(e, dateRangePicker) {
		this.chooseDateTime(dateRangePicker.startDate.valueOf(), dateRangePicker.endDate.valueOf());
	},

	chooseDateTime: function(start, end, label) {
		// this.setProperties({
		// 	minTime: start.valueOf(),
		// 	maxTime: end.valueOf()
		// });

		this._changeDateFilter('');
	},

	_changeDateFilter: function(label) {
		var maxTime = new Date(this.get('maxTime'));
		var minTime = new Date(this.get('minTime'));
		this.get('controller').send('changeDateFilter', minTime, maxTime, label);
	}
});

var computedFormattedTime = function(propertyName, labelUndefined) {
	return function() {
		var value = this.get(propertyName);
		return value ?
			value.format(this.get("format")) :
			labelUndefined;
	}.property(propertyName);
};

Balanced.ResultsLoaderDatePickerView = Balanced.View.extend({
	templateName: 'date_picker',
	format: 'MMM D, YYYY, h:mm a',

	startTimeLabel: computedFormattedTime("startTime", "..."),
	endTimeLabel: computedFormattedTime("endTime", "..."),

	didInsertElement: function() {
		var self = this;
		Ember.run.scheduleOnce('afterRender', function() {
			self.bindDatePicker();
		});
		this._super();
	},

	willDestroyElement: function() {
		var dateRangePicker = this.$('.datetime-picker').data('daterangepicker');
		if (dateRangePicker) {
			dateRangePicker.remove();
		}
		this._super();
	},

	bindDatePicker: function() {
		var self = this;
		var callback = function(start, end) {
			self.chooseDateTime(start.toDate(), end.toDate());
		};
		this.$('.datetime-picker')
			.daterangepicker({
				endDate: moment(this.get('maxTime')),
				startDate: moment(this.get('minTime')),
				locale: DEFAULT_LOCALE,
				timePicker: false,
				format: 'MMM D, YYYY',
				minDate: BALANCED_CREATED_AT,
				maxDate: moment().add('days', 2),
				parentEl: '.ember-application'
			}, callback)
			.on('apply.daterangepicker', function(e, dateRangePicker) {
				self.chooseDateTime(dateRangePicker.startDate, dateRangePicker.endDate);
			});
	},

	chooseDateTime: function(start, end) {
		var attributes = {
			startTime: start,
			endTime: end
		};
		this.setProperties(attributes);
		this.get("model").setProperties(attributes);
	}
});

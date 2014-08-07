Balanced.RegisteredSectionContainerView = Ember.ContainerView.extend({
	templateName: "registered_section_container",

	didInsertElement: function() {
		this.populateChildren();
	},

	populateChildren: function() {
		var self = this;
		this.clear();
		this.get("wrapper").forEach(function(view) {
			self.pushObject(view);
		});
	}.observes("wrapper"),

	wrapper: function() {
		var self = this;
		return this.get("sectionViews").map(function(callback) {
			return callback(self.get("controller"));
		});
	}.property("sectionViews", "controller"),

	sectionViews: function() {
		var sectionName = this.get("sectionName");
		return Balanced.getSectionViews(sectionName);
	}.property("sectionName"),
});

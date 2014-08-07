Balanced.RegisteredSectionContainerView = Ember.View.extend({
	templateName: "registered_section_container",
	wrapper: function() {
		var childViews = this.get("klasses").map(function(klass) {
			return klass.create({
				model: self.get("model")
			});
		});
	}.property("klasses", "model"),

	klasses: function() {
		var sectionName = this.get("sectionName");
		return Balanced.getSectionViews(sectionName);
	}.property("sectionName"),
});

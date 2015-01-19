`import Ember from "ember";`

TableCellLabel = Ember.Component.extend({
	tagName: "td"
	attributeBindings: ["title"]

	emptyLabel: "none"

	isLabel: Ember.computed("label", ->
		!Ember.isBlank(@get("label"))
	)

	title: Ember.computed.reads("label")
})

`export default TableCellLabel;`

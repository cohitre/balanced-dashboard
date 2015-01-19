`import Ember from "ember";`

TableLoadMore = Ember.Component.extend({
	tagName: "tr"
	classNames: "load-more-results"

	actions:
		buttonClicked: ->
			@sendAction "onButtonClick", @get("collection")

})

`export default TableLoadMore;`

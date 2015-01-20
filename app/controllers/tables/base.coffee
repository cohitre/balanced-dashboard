`import Ember from "ember";`

BaseTableController = Ember.Controller.extend(
	isLoadingMore: false

	actions:
		loadMore: (collection) ->
			@set "isLoadingMore", true
			collection.loadNext().finally =>
				@set "isLoadingMore", false

		delete: (model) ->
			Ember.assert("TableController must implement #delete action", false)

)

`export default BaseTableController;`

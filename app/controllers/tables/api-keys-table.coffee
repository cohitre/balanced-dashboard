`import Ember from "ember";`

ApiKeysTableController = Ember.Controller.extend(
	needs: ["marketplace"]

	isLoadingMore: false

	actions:
		loadMore: (collection) ->
			@set "isLoadingMore", true
			collection.loadNext().finally =>
				@set "isLoadingMore", false

		delete: (apiKey) ->
			console.log "Deleting", apiKey
)

`export default ApiKeysTableController;`

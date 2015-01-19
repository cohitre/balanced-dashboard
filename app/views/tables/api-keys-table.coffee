`import ResultsTableBase from "../results/results-table";`

defineColumn = (label, classes) ->
	label: label
	class: classes

ApiKeysTableView = ResultsTableBase.extend(
	template: "templates/tables/api-keys-table"

	collection: Ember.computed.reads("controller.model")
	isLoading: Ember.computed("collection", "collection.isLoaded", ->
		@get("collection") == undefined || !@get("collection.isLoaded")
	).readOnly()

	isLoadMore: Ember.computed("collection.hasNextPage", ->
		@get("collection.hasNextPage")
	).readOnly()

	columnHeaders: Ember.computed( ->
		[
			defineColumn("Date", "col-md-3")
			defineColumn("Name", "col-md-3")
			defineColumn("Secret", "col-md-5")
			defineColumn("", "col-icon")
		]
	).readOnly()
)

`export default ApiKeysTableView;`

`import BaseTableController from "./base";`

ApiKeysTableController = BaseTableController.extend(
	actions:
		delete: (apiKey) ->
			@send("openModal", "modals/api-key-delete-modal", apiKey)
#			apiKey.delete().then =>
#				@send "reloadApiKeys"
)

`export default ApiKeysTableController;`

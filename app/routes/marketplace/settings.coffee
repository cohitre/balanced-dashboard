`import AuthRoute from "../auth";`

MarketplaceSettingsRoute = AuthRoute.extend(
	pageTitle: 'Settings'
	setupController: (controller, model) ->
		@_super(controller, model)
		controller.send("reloadApiKeys")
)

`export default MarketplaceSettingsRoute;`

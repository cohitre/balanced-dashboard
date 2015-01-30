`import AnalyticsLogger from "balanced-dashboard/utils/analytics_logger";`
`import ModalBaseView from "./modal-base";`
`import Form from "balanced-dashboard/views/modals/mixins/form-modal-mixin";`
`import Full from "balanced-dashboard/views/modals/mixins/full-modal-mixin";`
`import Save from "balanced-dashboard/views/modals/mixins/object-action-mixin";`

MarketplaceCreateView = ModalBaseView.extend(Full, Form, Save,
	elementId: "marketplaceCreate"
	templateName: "modals/marketplace-create"
	title: "Apply for production access"
	subtitle: "Step 2: Provide marketplace information"

	isMarketplaceApplicationProcess: false

	getUser: ->
		@container.lookup("auth:main").get("user")

	emailAddressExplanationText: Ember.computed(->
		if BalancedApp.USE_MARKETPLACE_APPLICATION
			"We will send a verification email to this address"
		else
			null
	)

	createMarketplaceApplication: ->
		mp = @get("marketplace")
		@trackEvent "Creating marketplace application", mp.getDebuggingProperties()
		@getNotificationController()
			.alertSuccess("Your application is submitted. You will receive an confirmation email shortly.", name: "marketplace-application-success")
		@close()
		@set("isSaving", false)


	linkMarketplaceToUser: ->
		mp = @get("marketplace")

		@trackEvent "Marketplace created", mp.getDebuggingProperties()
		@trackEvent "Linking marketplace to user", mp.getDebuggingProperties()

		@container
			.lookup("controller:register-flow/user-marketplace")
			.addApiKeyToCurrentUserFlow(@get("apiKey.secret"))
			.then =>
				@trackEvent "Marketplace linked to user", mp.getDebuggingProperties()
				@getModalNotificationController().alertSuccess("Your marketplace has been created.", name: "marketplace-creation-success")
				@close()

	onModelSaved: (model) ->
		if BalancedApp.USE_MARKETPLACE_APPLICATION
			@createMarketplaceApplication()
		else
			@linkMarketplaceToUser()

	model: Ember.computed.reads("marketplace").readOnly()

	getModelToBeSaved: ->
		mp = @get("marketplace")

		if BalancedApp.USE_MARKETPLACE_APPLICATION
			store = @container.lookup("store:balanced")
			mpApplication = store.build("marketplace-application")
			mpApplication.ingestUser @getUser()
			mpApplication.ingestMarketplace mp
			mpApplication.ingestApiKey @get("apiKey")
			mpApplication
		else
			mp

	actions:
		save: ->
			mp = @get("marketplace")
			@getModalNotificationController().clearAlerts()
			@trackEvent "User creating marketplace", mp.getDebuggingProperties()
			if @get("isTermsAccepted")
				@save @getModelToBeSaved()
			else
				@getModalNotificationController()
					.alertError("Must accept the terms and conditions", name: "terms-accepted")
)

`export default MarketplaceCreateView;`

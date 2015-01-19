`import Ember from "ember";`

BootstrapPopoverComponent = Ember.Component.extend(
	tagName: "span"
	attributeBindings: ['data-toggle', 'data-placement', 'data-original-title', 'data-content', 'data-trigger', 'data-template']
	'data-toggle': 'popover'

	"data-trigger": Ember.computed.reads("triggerOn")
	"data-placement": Ember.computed.reads("placement")
	"data-original-title": Ember.computed.reads("title")
	"data-content": Ember.computed.reads("content")

	selector: '[rel="popover"]'

	didInsertElement: ->
		$(@element).popover()
		@_super()
)

`export default BootstrapPopoverComponent;`

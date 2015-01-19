`import Ember from "ember";`
`import BkApiKey from "balanced-addon-models/models/api-key";`

ApiKey = BkApiKey.extend(
	name: Ember.computed.reads("meta.name").readOnly()
)

`export default ApiKey;`

`import BaseFormField from "./base-form-field";`

DATE_FORMAT = /^(\d\d) [\/-] (\d\d\d\d)$/

FormFieldView =  BaseFormField.extend(
	templateName: "form-fields/month-year-input-form-field"

	value: Ember.computed "monthValue", "yearValue", (attrName, val) ->
		if arguments.length > 1
			@setValue(val)
		@getValue @get("monthValue"), @get("yearValue")

	getValue: (month, year) ->
		if month && year
			if month < 10
				return "0#{month} / #{year}"
			else
				return "#{month} / #{year}"
		else
			return ""

	setValue: (val) ->
		month = null
		year = null
		if !Ember.isBlank(val)
			match = val.match(DATE_FORMAT)
			if match
				month = match[1]
				year = match[2]

		@setProperties(
			monthValue: month
			yearValue: year
		)
)

`export default FormFieldView;`

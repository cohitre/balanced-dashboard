module("Balanced.UrlStringUtilities");

test("#queryStringToObject", function(assert) {
	var execute = function(string, expectation) {
		var method = Balanced.UrlStringUtilities.queryStringToObject;
		assert.deepEqual(method(string), expectation);
	};

	execute(undefined, undefined);
	execute("cool?one=1&two=2", {
		one: "1",
		two: "2"
	});

	execute("cool?created_at%5B%3E%5D=1%2B3", {
		"created_at[>]": "1+3"
	});

	execute("noquerystring", undefined);
});

test("#objectToQueryString", function(assert) {
	var execute = function(object, expectation) {
		var method = Balanced.UrlStringUtilities.objectToQueryString;
		assert.deepEqual(method(object), expectation);
	};

	execute({
		"created_at[>]": "1+3"
	}, "created_at%5B%3E%5D=1%2B3");

	execute(undefined, undefined);
	execute({
		one: "1",
		two: 2
	}, "one=1&two=2");

	execute({}, "");
});

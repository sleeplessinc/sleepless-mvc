
# Sleepless MVC

Expects jquery to be loaded.
Expects sleepless.js (https://github.com/sleeplessinc/sleepless)

See test.html for example usage.

## MVC.tie()

Tie a model to the UI
Looks for any elements in UI with a data-key attribute.
Uses the value of that attribute to access a value in the model.
If found in the model, the value is copied to the UI element.
A change handler is then attached to the element that copies the value back into the model.

If a set_hook function is provided, the UI element and the value from the model will be passed
into it after the value is taken from the model, but before it is placed into the UI, giving the
caller a way to modify/filter the value on its way from model to UI.
The modified value should be returned from set_hoook().

If a get_hook function is provided, the UI element and the value from the UI will be passed
into it after the value is taken from the UI, but before it is placed into the model, giving the
caller a way to modify/filter the value on its way from UI to model.
The modified value should be returned from get_hoook().

## MVC.set_data_keys()

Attempts to infer and set, a sensible data-key attribute on all input, textarea, and select elements using whatever other attributes it can find.

DOM before call:

	<input id=foo>
	<input name="Hi Mom!">
	<input title=baz>
	<input data-key=qux>
	<input placeholder="Bar">

Then ...

	MVC.set_data_keys();

DOM after call:

	<input id=foo data-key=foo>
	<input name="Hi Mom!" data-key=hi_mom>
	<input title=baz data-key=baz>
	<input data-key=qux data-key=qux>
	<input placeholder="Bar" data-key=bar>


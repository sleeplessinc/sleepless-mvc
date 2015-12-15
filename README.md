
# Sleepless MVC

Expects jquery to be loaded.
Expects sleepless.js (https://github.com/sleeplessinc/sleepless)

See test.html for example usage.

# MVC.tie()

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


/*

Copyright 2015 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 

*/

// NOTE: assumes jquery has been loaded
// NOTE: assumes sleepless.js has been loaded

MVC = {};

(function() {
	
	// Attempts to infer and set, a sensible data-key attribute on all
	// input, textarea, and select elements using whatever other attributes are available.
	MVC.set_data_keys = function() {
		$("input,textarea,select").each(function() {
			$t = $(this);
			var dk = $t.attr("data-key");
			if(dk) {
				return;		// already set
			}
			// try to convert name (or id if no name) for use as dk
			dk = $t.attr("id") || $t.attr("name") || $t.attr("placeholder") || $t.attr("title");
			if(!dk) {
				return;
			}
			dk = dk.toId();
			this.setAttribute("data-key", dk);
		});
	}

	// Tie a model to the UI
	// Looks for any elements in UI with a data-key attribute.
	// Then the value of that attribute is used to look for a key in the model
	// If found in the model, the value is moved to the UI element
	// A change handler is attached to the element so that when it is modified, the value
	// is copied back into the model.
	MVC.tie = function(model, set_hook, get_hook) {

		// find all elements with a data-key attribute
		$("[data-key]").each(function() {			// step through each of them.

			var el = this;
			var dk = el.getAttribute("data-key");
			var val = el.value;

			// dig out object that actually holds/receives value
			var a = dk.split(".");		// split the data-key value on dots; "foo.bar" becomes ["foo","bar"]
			var m = model;
			while(a.length > 1) {
				var k = a.shift();
				var next_m = m[k];
				if(next_m === undefined) {
					next_m = {};
					m[k] = next_m;
				}
				m = next_m;
			}
			var key = a.shift();		// a should now be empty, i.e., []

			// move value from model (if present) into UI
			var val = m[key];
			if(val !== undefined) {

				if(set_hook) {
					val = set_hook(el, val);
				}

				if(el.type == "radio") {
					el.checked = (el.value == val);
				}
				else {
					if(typeof val === "boolean") {
						el.checked = val
					}
					else {
						el.value = val;
					}
				}
			}

			// set change handler 
			el.onchange = function() {
				var val = null;

				// get value from UI
				if(el.type == "checkbox") {
					val = this.checked;
				}
				else
				if(el.type == "number") {
					val = toFlt(this.value);
				}
				else {
					val = this.value;
				}

				// optionally modify val with hoook
				if(get_hook) {
					val = get_hook(el, val);
				}

				m[key] = val;			// place value into model
			}
		});
	}
})();


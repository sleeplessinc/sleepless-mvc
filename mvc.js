

// NOTE: assumes jquery has been loaded

MVC = {};

(function() {
	
	var set_data_keys = function() {
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

	var set_one = function(model, key, element, set_hook, get_hook) {
		var val = model[key];

		if(set_hook) {
			val = set_hook(element, val);		// optionally give client a chance to modify val
		}

		if(element.type == "radio") {
			element.checked = (element.value == val);
		}
		else {
			if(typeof val === "boolean") {
				element.checked = val
			}
			else {
				element.value = val;
			}
		}

		element.onchange = function() {
			var val = null;

			if(element.type == "checkbox") {
				val = this.checked;
			}
			else
			if(element.type == "number") {
				val = toFlt(this.value);
			}
			else {
				val = this.value;
			}

			if(get_hook) {
				val = get_hook(element, val);		// optionally give client a chance to modify val
			}

			model[key] = val;
		}
	}


	var set_all = function(model, mom, set_hook, get_hook) {
		var pre = mom ? (mom+"_") : "";
		for(var key in model) {
			if(typeof model[key] === "object") {
				set_all(model[key], pre+key, set_hook, get_hook);
			}
			else {
				$("[data-key="+pre+key+"]").each(function() {
					set_one(model, key, this, set_hook, get_hook);
				});
			}
		}
	}

	// update UI to match model
	MVC.toUI = function(model, set_hook, get_hook) {
		set_data_keys();
		set_all(model, null, set_hook, get_hook);
	}

})();



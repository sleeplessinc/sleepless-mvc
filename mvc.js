

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

	var set_one = function(model, key, element) {
		var val = model[key];

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
			if(element.type == "checkbox") {
				model[key] = this.checked;
			}
			else
			if(element.type == "number") {
				model[key] = toFlt(this.value);
			}
			else {
				model[key] = this.value;
			}
		}
	}


	var set_all = function(model, mom) {
		var pre = mom ? (mom+"_") : "";
		for(var key in model) {
			if(typeof model[key] === "object") {
				set_all(model[key], pre+key);
			}
			else {
				$("[data-key="+pre+key+"]").each(function() {
					set_one(model, key, this);
				});
			}
		}
	}

	// update UI to match model
	MVC.toUI = function(model) {
		set_data_keys();
		set_all(model);
	}

})();



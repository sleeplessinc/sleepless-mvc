

// NOTE: assumes jquery has been loaded

MVC = {};

(function() {
	
	var set_data_keys = function() {
		$("input,textarea,select").each(function() {
			if(this.name) {
				var dk = this.name.toId();
				this.setAttribute("data-key", dk);
			}
		});
		return function(){};
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





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

	var setup = function(model, key, element) {
		var val = model[key];

		if(typeof val === "boolean") {
			element.checked = val
		}
		else {
			element.value = val;
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

	// update UI to match model
	MVC.toUI = function(model) {

		set_data_keys();

		for(var key in model) {
			var element = $("[data-key="+key+"]")[0];
			if(element) {
				setup(model, key, element);
			}
		}
	}

})();



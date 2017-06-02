(function(){
	"use strict";

	let advancedModule = require('./advanced/index'),
		$ = require('jquery');

	class netjsonEditor{
		constructor({target, schema, data, helpText, validate, onChange, jsonError}){
			this.targetElement = $(target);
			this.targetElement.hide();

			this.onChangeCb = onChange? onChange: ()=>{};
			jsonError = jsonError? jsonError: "Json entered is invalid";

			onChange = () => {
				this.changed(this.onChangeCb);
			};
			
			helpText = helpText? helpText:`Want learn to use the advanced mode? Consult the
				    <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html"
				       target="_blank">netjsonconfig documentation
				    </a>.`; 

			this.initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError});
		}

		initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError}){
			this.advancedEditor = new advancedModule({target, helpText, data, schema, validate, onChange, jsonErrorMessage: jsonError});
		}

		changed(onChange){
			onChange();
		}

		changeSchema(schema){
			this.advancedEditor.changeSchema(schema);
		}

		get text(){
			return this.targetElement.val();
		}

		get json(){
			return JSON.parse(this.targetElement.val());
		}

		setJson(json){
			this.targetElement.val(JSON.stringify(json));
			this.advancedEditor.setJson(json);
		}

	}

	window.netjsonEditor = module.exports = netjsonEditor;
})();

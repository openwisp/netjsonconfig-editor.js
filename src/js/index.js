(function(){
	"use strict";

	let AdvancedModule = require('./advanced/index'),
		$ = require('jquery');

	class NetjsonEditor{
		constructor({target, schema, data, helpText, validate, onChange, jsonError}){
			target = target? target: "#netjsonconfig-area";
			this.targetElement = $(target);
			this.targetElement.hide();

			schema = schema? schema: {};
			this._schema = schema;

			this.onChangeCb = onChange? onChange: ()=>{};
			jsonError = jsonError? jsonError: "Json entered is invalid";
			data = data? data: {};

			onChange = () => {
				this.changed(this.onChangeCb);
			};
			
			helpText = helpText? helpText:`Want learn to use the advanced mode? Consult the
				    <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html"
				       target="_blank">netjsonconfig documentation
				    </a>.`; 

			this.initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError});
			this.setJson(data);
		}

		initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError}){
			this.advancedEditor = new AdvancedModule({target, helpText, data, schema, validate, onChange, jsonErrorMessage: jsonError});
		}

		changed(onChange){
			onChange();
		}

		changeSchema(schema){
			this._schema = schema;	
			this.advancedEditor.changeSchema(schema);
		}


		get text(){
			return this.targetElement.val();
		}

		get json(){
			return JSON.parse(this.targetElement.val());
		}

		get schema(){
			return this._schema;
		}

		setJson(json){
			this.targetElement.val(JSON.stringify(json));
			this.advancedEditor.setJson(json);
		}

	}

	window.netjsonEditor = module.exports = NetjsonEditor;
})();

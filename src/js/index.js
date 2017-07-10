(function(){
	"use strict";

	let AdvancedModule = require('./advanced/index'),
		$ = require('jquery'),
	BasicEditor = require('./basic/index');

	class NetjsonEditor{
		constructor({target, schema, data, helpText, validate, onChange, jsonError}){
			target = target? target: "#netjsonconfig-area";
			this.targetElement = $(target);
			this.targetElement.hide();

			schema = schema? schema: {};
			this._schema = schema;

			validate = !validate? false: true;

			let onChangeCb = onChange? onChange: ()=>{};

			jsonError = jsonError? jsonError: "Json entered is invalid";

			data = data? data: {};


			onChange = (data) => {
				this.changed(onChangeCb, data);
			};
			
			helpText = helpText? helpText:`Want learn to use the advanced mode? Consult the
				    <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html"
				       target="_blank">netjsonconfig documentation
				    </a>.`; 

			this.props = {target, helpText, data, schema, validate, onChange, jsonError};
			
			this.initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError});
			this.initBasicEditor({target, helpText, data, schema, validate, onChange, jsonError});
			this.setJson(data);
		}

		initAdvancedEditor({target, helpText, data, schema, validate, onChange, jsonError}){

			this.advancedEditor = new AdvancedModule({target, helpText, data, schema, validate, onChange, jsonErrorMessage: jsonError, swapOut: () => this.showBasiceEditor() });
		}

		initBasicEditor({target, helpText, data, schema, validate, onChange, jsonError}){
			this.element = $(`
    		<div id="basic_editor_container">
    		</div>`);
	    	this.element.insertBefore($(target));
	    	this.basicEditor = new BasicEditor({target, helpText, data, schema, validate, onChange, jsonError, container: "basic_editor_container", swapOut: () => this.showAdvancedEditor() });
		}

		changed(onChange, data){
			console.log(data);
			this.targetElement.val(JSON.stringify(data));
			onChange();
		}

		changeSchema(schema){
			this._schema = schema;	
			this.advancedEditor.changeSchema(schema);
			this.basicEditor.setSchema(schema, this.json);
		}

		showAdvancedEditor(){
			this.setJson(JSON.parse(this.targetElement.val()));
			this.advancedEditor.show();
		}

		showBasiceEditor(){
			this.setJson(JSON.parse(this.targetElement.val()));
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
			this.props.data = json;
			this.basicEditor.setData(json);
		}

	}

	window.netjsonEditor = module.exports = NetjsonEditor;
})();

(function(){
	"use strict";

	let advancedModule = require('./advanced/index'),
		$ = require('jquery');

	class netjsonEditor{
		constructor({target, schema, data, helpText, validate, onChange}){
			this.targetElement = $(target);
			this.targetElement.hide();

			this.onChangeCb = onChange? onChange: ()=>{};

			onChange = () => {
				this.changed(this.onChangeCb);
			};
			
			this.initAdvancedEditor({target, helpText, data, schema, validate, onChange});
		}

		initAdvancedEditor({target, helpText, data, schema, validate, onChange}){
			this.advancedEditor = new advancedModule({target, helpText, data, schema, validate, onChange});
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

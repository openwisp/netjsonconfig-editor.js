
let jsonEditor = require('jsoneditor'),
	$ = require('jquery'),
	Ajv = require('ajv'),
	metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');

require('../themes/tomorrow_night_bright');

class AdvancedJSONEditor {
	constructor({target, schema, data, helpText, validate,
			onChange, jsonErrorMessage, swapOut}) {
		this.swapOut = swapOut;
		// set message to be used to alertwrong json
		this.setJsonErrorMessage(jsonErrorMessage);
		// disable validation if not required
		this.validate = validate;

		schema = validate? schema: {};
		// build options for advanced mode
		let options = {
			mode:'code',
			theme: 'ace/theme/tomorrow_night_bright',
			indentation: 4,
			onEditable: () => {
				return true;
			},
			onChange: () => {
				try{
					if(this.schemaValid){
						onChange(this.editor.get());
					}
				}catch(err){
					return err;
				}
			},
			schema: schema
		}
		this.render({helpText, options, data, target});
	}

	render({helpText, options, data, target}){

		// code to make sure we use ajv for draft 04 schemas which we need 
		let ajv = new Ajv({
			meta: false, // optional, to prevent adding draft-06 meta-schema
			extendRefs: true, // optional, current default is to 'fail', spec behaviour is to 'ignore'
			unknownFormats: 'ignore',  // optional, current default is true (fail)
		});

		ajv.addMetaSchema(metaSchema);
		ajv._opts.defaultMeta = metaSchema.id;

		// optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
		ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema';

		// Optionally you can also disable keywords defined in draft-06
		ajv.removeKeyword('propertyNames');
		ajv.removeKeyword('contains');
		ajv.removeKeyword('const');

		// ajv fixes end here

		// create advanced mode element with jQuery and insert into the DOM
		this.element = $("<div class='advanced-mode full-screen'></div>");
		this.element.appendTo($(target));

		this.editor = new jsonEditor(this.element[0], {...options, ajv: ajv}, data);
		this.editor.aceEditor.setOptions({
			fontSize: 14,
			showInvisibles: true
		});

		// remove powered by ace link
		this.element.find('.jsoneditor-menu a').remove();

		let that = this;

		// add controls to the editor header
		this.element.find('.jsoneditor-menu')
			.append($(`<a href="javascript:;" class="jsoneditor-exit">
							back to normal mode
						</a>`
				).click(() => {
					that.closeEditor();
				}))
			.append(`
				<label id="netjsonconfig-hint">
					${helpText}
				</label>
		`);

		$(window).resize(function(){
			that.element.height($(window).height()).width(window.outerWidth);
		});

		this.element.hide();
	}

	show(){
		$('body').addClass('editor-full');
		window.scrollTo(0, 0);
		this.element.show();
		this.active = true;
	}

	hide(){
		$('body').removeClass('editor-full');
		this.element.hide();
		this.active = false;
	}

	changeSchema(schema){
		this.editor.setSchema(schema);
	}

	setJson(json){
		this.editor.set(json);
	}

	get schemaValid(){
		return this.editor.validateSchema(this.editor.get());
	}

	closeEditor(){
		if(this.validate && this.schemaValid){
			this.swapOut();
		}else{
			this.alertInvalidJSON();
		}
	}
	
	/*
	* Send an aler to indicate json entered is either invalid or does not match the schema
	*/
	alertInvalidJSON(){
		alert(this.jsonErrorMessage);
	}

	/*
	* set invalid json error message
	*/
	setJsonErrorMessage(jsonErrorMessage){
		this.jsonErrorMessage = jsonErrorMessage;
	}
}

module.exports = AdvancedJSONEditor;

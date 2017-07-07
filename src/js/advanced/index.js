let jsonEditor = require('jsoneditor'),
theme = require('../themes/tomorrow_night_bright'),
$ = require('jquery');

class AdvancedJSONEditor {

  	constructor({target, schema, data, helpText, validate, onChange, jsonErrorMessage, swapOut}) {
  		// set constant for advanced mode element id, to be uses all through.
  		this.advanced_el_id = "advanced_editor";

  		// create advanced mode element with jQuery and insert into the DOM
    	this.element = $(`
    		<div class="advanced_editor_container full-screen">
    			<div id='${this.advanced_el_id}' class="advanced-mode"></div>
    		</div>`);
	    this.element.insertBefore($(target));

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
	        onEditable: (node) => {
	            return true;
	        },
	        onChange: () => {
	        	try{
			 		if(this.schemaValid){
		           		onChange(this.editor.get());
			 		}
	        	}catch(err){

	        	}
	        },
	        schema: schema
	    }
	    this.render({helpText, options, data});
  	}

  	render({helpText, options, data}){
	    
	    this.editor = new jsonEditor(document.getElementById(this.advanced_el_id), options, data);
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
		        			<img class="icon" src="../assets/img/icon-deletelink.svg" />
		        			back to normal mode
		        		</a>`
		        	).click((e) => {
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

        window.scrollTo(0,0);
  		this.element.hide();
  	}

  	show(){
        $('body').addClass('editor-full');
  		this.element.show();
  	}

  	hide(){
  		this.swapOut();
        $('body').removeClass('editor-full');
  		this.element.hide();
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
		console.log(this.schemaValid);
		if(this.validate && this.schemaValid){
			this.hide();
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
};

module.exports = AdvancedJSONEditor;

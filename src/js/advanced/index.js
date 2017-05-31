let jsonEditor = require('jsoneditor'),
theme = require('./themes/tomorrow_night_bright'),
$ = require('jquery');

class advancedJSONEditor {

  	constructor({target}) {
  		// set constant for advanced mode element id, to be uses all through.
  		this.advanced_el_id = "advanced_editor";

  		// create advanced mode element with jQuery
    	this.element = $(`
    		<div class="advanced_editor_container">
    			<div id='${this.advanced_el_id}' class="advanced-mode"></div>
    		</div>`);
	    this.element.insertBefore($(target));

	    let options = {
	        mode:'code',
	        theme: 'ace/theme/tomorrow_night_bright',
	        indentation: 4,
	        onEditable: function(node){
	            return true;
	        },
	        onChange:function() {
	           $(target).val(editor.getText())
	        },
	        // schema: schema
	    }

	    this.editor = new jsonEditor(document.getElementById(this.advanced_el_id), options);
	    this.editor.aceEditor.setOptions({
	        fontSize: 14,
	        showInvisibles: true
	    });
	    this.render();
  	}

  	render(){
		// remove powered by ace link
	    this.element.find('.jsoneditor-menu a').remove();
	    // add  listener to .screen-mode button for toggleScreenMode
	    this.element.parents('.field-config').find('.screen-mode').click((e)=>{
	    	this.toggleScreenMode();
	    });
	    // add controls to the editor header
	    this.element.find('.jsoneditor-menu')
	        .append($(`<a href="javascript:;" class="jsoneditor-exit">
		        			<img class="icon" src="../assets/img/icon-deletelink.svg" />
		        			back to normal mode
		        		</a>`
		        	))
	        .append(`
	        	<label id="netjsonconfig-hint">
				    Want learn to use the advanced mode? Consult the
				    <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html"
				       target="_blank">netjsonconfig documentation
				    </a>.
				</label>
	        	`);
	    this.show();
  	}

  	show(){
  		this.toggleScreenMode(true);
  	}

  	hide(){
  		this.toggleScreenMode(false);
  	}

  	toggleScreenMode(inFullScreenMode){
        if(inFullScreenMode){
            // store the old height and width of the editor before going to fullscreen mode in order to be able to restore them
            let oldHeight = this.element.height();
            let oldWidth = this.element.width();
            this.element.addClass('full-screen').height($(window).height()).width(window.outerWidth);
            $('body').addClass('editor-full');
            $(window).resize(function(){
                this.element.height($(window).height()).width(window.outerWidth);
            });
            inFullScreenMode = true;
            this.element.find('.jsoneditor-menu a').show()
            this.element.find('.jsoneditor-menu label').show()
            window.scrollTo(0,0);
        }
        else{
            this.element.removeClass('full-screen').height(oldHeight).width(oldWidth);
            $('body').removeClass('editor-full');
            // unbind all events listened to while going to full screen mode
            $(window).unbind('resize');
            this.inFullScreenMode = false;
            document.getElementById('advanced_editor').scrollIntoView(true);
            this.element.find('.jsoneditor-menu a').hide()
            this.element.find('.jsoneditor-menu label').hide()
        }
  	}
};

module.exports = advancedJSONEditor;

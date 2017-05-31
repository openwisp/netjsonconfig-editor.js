(function(){
	"use strict";

	let advancedModule = require('./advanced/index'),
		$ = require('jquery');

	class netjsonEditor{
		constructor({target}){
			this.targetElement = $(target);
			this.targetElement.hide();

			this.advancedEditor = new advancedModule({target});
		}
	}
	window.netjsonEditor = module.exports = netjsonEditor;
})();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

class BasicEditor {

	constructor({target, schema, data, helpText, validate, onChange, jsonError, container, swapOut}){
		this.render({target, schema, data, helpText, validate, onChange, jsonError, container, swapOut});
	}

	render({target, schema, data, helpText, validate, onChange, jsonError, container, swapOut}){
		const dest = document.getElementById(container)

		ReactDOM.render(
		    <App schema={schema} data={data} onChange={onChange} ref={ instance => { this.reInit = instance.reInit; this.setSchema = instance.setSchema; }} helpText={helpText} swapOut={swapOut}/>,
		    dest
		)
	}
}

module.exports = BasicEditor;

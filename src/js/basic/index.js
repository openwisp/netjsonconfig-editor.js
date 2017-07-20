import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

class BasicEditor {
	constructor({target, schema, data, helpText,
			validate, onChange, jsonError, swapOut}){
		this.render({target, schema, data, helpText, validate, onChange, jsonError, swapOut});
		this.container = target;
		this.swapOut = swapOut;
	}

	hide(){
		this.active = false;
		this.container.hide();
	}

	show(){
		this.active = true;
		this.container.show();
	}

	render({schema, data, helpText, onChange, jsonError, target, swapOut}){

		ReactDOM.render(
			<App schema={schema} data={data} jsonError={jsonError} onChange={onChange} ref={ instance => {this.setData = (data) => instance.setData(data); this.setSchema = (schema, data) => {instance.setSchema(schema, data)}} } helpText={helpText} swapOut={swapOut}/>,
			target[0]
		);
	}
}

module.exports = BasicEditor;

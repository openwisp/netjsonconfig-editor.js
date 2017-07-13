import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

class BasicEditor {

	constructor({target, schema, data, helpText, validate, onChange, jsonError, container, swapOut}){
		this.render({target, schema, data, helpText, validate, onChange, jsonError, container, swapOut});
	}

	render({schema, data, helpText, onChange, jsonError, container, swapOut}){
		const dest = document.getElementById(container);

		ReactDOM.render(
			<App schema={schema} data={data} jsonError={jsonError} onChange={onChange} ref={ instance => {this.setData = (data) => instance.setData(data); this.setSchema = (schema, data) => {instance.setSchema(schema, data)}} } helpText={helpText} swapOut={swapOut}/>,
			dest
		);
	}
}

module.exports = BasicEditor;

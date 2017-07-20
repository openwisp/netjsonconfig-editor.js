import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer, initialize } from 'redux-form';
import { Provider } from 'react-redux';
import Liform from 'liform-react';
import {renderField, DefaultTheme} from "liform-react";
import {setSchema, setOnChange, setBodyKey} from './actions';
import {schemaReducer, onChangeReducer, bodyKeyReducer} from './reducers';
import PropTypes from 'prop-types';

const MyBaseForm = props => {
	const { schema, theme, error } = props
	return (
        <div className="padding">
            <div>
                {error && <strong>{error}</strong>}
                {error && <hr/>}
            </div>
            {renderField(schema, schema.title, theme || DefaultTheme)}
        </div>)
}


class BasicBody extends React.Component {
	
	constructor(props){
		super(props);

		const reducer = combineReducers({
			form: formReducer,
			schema: schemaReducer,
			onChange: onChangeReducer,
			bodyKey: bodyKeyReducer
		});
		
		const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer);
		store.dispatch(setSchema(props.schema));
		store.dispatch(setOnChange(props.onChange));
		store.dispatch(setBodyKey(Date.now()));

		this.state = store.getState();
		this.schema = this.state.schema;
		this.store = store;
	}

	componentDidMount(){
		this.store.subscribe(()=>{
			this.schema = this.state.schema;
			let values = this.store.getState().form[this.state.schema.title || "form"];
			if(values){
				values = values.values;
				this.state.onChange(values);
			}
		});
	}

	render() {
		return (<Provider store={this.store}>
					<Liform schema={this.schema} key={this.state.bodyKey} initialValues={this.props.data} baseForm={MyBaseForm}/>
				</Provider>);
	}

	reInit(data){
		let name = this.props.schema.title || "form";
		this.store.dispatch(initialize(name, data));
	}
}

MyBaseForm.propTypes = {
	schema: PropTypes.object,
	error: PropTypes.object,
	theme: PropTypes.array
}

BasicBody.propTypes = {
	schema: PropTypes.object,
	onChange: PropTypes.func,
	data: PropTypes.object
}

export default BasicBody;
export {MyBaseForm};

import React from 'react';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer, initialize} from 'redux-form';
import {Provider} from 'react-redux';
import Liform from 'liform-react';
import {renderField, DefaultTheme} from 'liform-react';
import {setSchema, setOnChange, setBodyKey} from './actions';
import {schemaReducer, onChangeReducer, bodyKeyReducer} from './reducers';
import PropTypes from 'prop-types';
/**
 * Represents the container for the liform-react form
 * @class {object} MyBaseForm
 * @param {object} props - properties to initialise the editor UI
 * @return {object} MyBaseForm
 */
const MyBaseForm = (props) => {
  const {schema, theme, error} = props;
  return (
    <div className="padding">
      <div>
        {error && <strong>{error}</strong>}
        {error && <hr />}
      </div>
      {renderField(schema, schema.title, theme || DefaultTheme)}
    </div>);
};

/**
 * Class to control the BasicEditor body UI
 * @class BasicBody
 * @extends React.Component
 */
class BasicBody extends React.Component {
  /**
   * Constructor to initialise the UI Body
   * @param {object} props - properties to initialise the editor UI Body
   */
  constructor(props) {
    super(props);

    const reducer = combineReducers({
      form: formReducer,
      schema: schemaReducer,
      onChange: onChangeReducer,
      bodyKey: bodyKeyReducer,
    });

    const store = (window.devToolsExtension ?
      window.devToolsExtension()(createStore) : createStore)(reducer);
    store.dispatch(setSchema(props.schema));
    store.dispatch(setOnChange(props.onChange));
    store.dispatch(setBodyKey(Date.now()));

    this.state = store.getState();
    this.schema = this.state.schema;
    this.store = store;
  }
  /**
   * Method to be called after this component mounts successfully
   */
  componentDidMount() {
    this.store.subscribe(() => {
      this.schema = this.state.schema;
      let key = this.state.schema.title || 'form';
      let values = this.store.getState().form[key];
      if (values) {
        values = values.values;
        this.state.onChange(values);
      }
    });
  }
  /**
   * Method to be used to render the component
   * @return {object} provider - container for managing liform-react UI state
   */
  render() {
    return (<Provider store={this.store}>
      <Liform schema={this.schema}
        key={this.state.bodyKey}
        initialValues={this.props.data}
        baseForm={MyBaseForm} />
    </Provider>);
  }
  /**
   * Methods to be used to set data within liform react-editor
   * @param {object} data - data to be set within the editor
   */
  setData(data) {
    const name = this.props.schema.title || 'form';
    this.store.dispatch(initialize(name, data));
  }
}

MyBaseForm.propTypes = {
  schema: PropTypes.object,
  error: PropTypes.object,
  theme: PropTypes.array,
};

BasicBody.propTypes = {
  schema: PropTypes.object,
  onChange: PropTypes.func,
  data: PropTypes.object,
};

export default BasicBody;
export {MyBaseForm};

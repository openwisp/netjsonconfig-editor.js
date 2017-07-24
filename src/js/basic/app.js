import React from 'react';
import BasicBody from './body';
import PropTypes from 'prop-types';

/**
 * Class to manage the UI for the basic Editor.
 * @class App
 * @extends React.Component
 */
class App extends React.Component {
  /**
   * Constructor to initialise the UI
   * @param {object} props - properties to initialise the editor UI
   */
  constructor(props) {
    super(props);
    this.state = {
      schema: props.schema,
      key: Date.now(),
      data: props.data,
    };
  }
  /**
   * method to set the new schema to be displayed within the editor
   * @param {object} schema - schema to be set on the UI
   * @param {object} data - json data to be set after rerendering UI
   */
  setSchema(schema, data) {
    this.setState({
      schema,
      key: Date.now(),
      data,
    });
  }
  /**
   * method to set data  within the editor UI
   * @param {object} data - json data to be set within the editor
   */
  setData(data) {
    this.setState({
      data,
    });
    this.__reInit(data);
  }
  /**
   * Method to render the  the UI
   * @return {object} div - container object containing the header and footer
   */
  render() {
    return (<div className="basic-editor">
      <Header helpText={this.props.helpText} swapOut={this.props.swapOut} />
      <BasicBody
        schema={this.state.schema}
        key={this.state.key}
        data={this.state.data}
        ref={(instance) => this.__reInit = (data) => instance.setData(data)}
        onChange={this.props.onChange} />
    </div>);
  }
}
/**
 * Header Component to be used in the UI
 * @constructs Header
 * @param {object} props - properties to be used to render the header
 * @return {object} HEADER
*/
const Header = (props) => (<div className="basic-header row">
    <div className="name col-md-4">
        Editor Name Here
    </div>
    <div className="label helpText col-md-6">
      <label className="netjsonconfig-hint"
        dangerouslySetInnerHTML={{__html: props.helpText}} />
    </div>
    <div className="advanced-button-container col-md-2">
      <button
        className="advanced-button btn"
        onClick={() => {
          props.swapOut();
        }}
      >Advanced Mode</button>
    </div>
  </div>);

App.propTypes = {
  schema: PropTypes.object,
  data: PropTypes.object,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  jsonError: PropTypes.string,
  swapOut: PropTypes.func,
};

Header.propTypes = {
  helpText: PropTypes.string,
  swapOut: PropTypes.func,
};
export default App;

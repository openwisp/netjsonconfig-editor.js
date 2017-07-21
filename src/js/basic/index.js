import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
/**
 * Represents an instance of the Basic Editor
 * @class BasicBeditor
 */
class BasicEditor {
  /**
   * Constructor to initialise the Basic
   * @param {object} props - properties to initialise the editor UI
   * @constructs BasicEditor
   */
  constructor({target, schema, data, helpText,
               validate, onChange, jsonError, swapOut}) {
    this.render({target, schema, data, helpText,
      validate, onChange, jsonError, swapOut});
    this.container = target;
    this.swapOut = swapOut;
  }
  /**
   * Method use to hide the Basic Editor
   */
  hide() {
    this.active = false;
    this.container.hide();
  }
  /**
   * Method use to show the Basic Editor
   */
  show() {
    this.active = true;
    this.container.show();
  }
  /**
   * Method use to render the Basic Editor
   * @param {object} props - object containing props for the 'App' object
   */
  render({schema, data, helpText, onChange, jsonError, target, swapOut}) {
    ReactDOM.render(
      <App
        schema={schema}
        data={data}
        jsonError={jsonError}
        onChange={onChange}
        ref={(instance) => {
          this.setData = (data) => instance.setData(data);
          this.setSchema = (schema, data) => {
            instance.setSchema(schema, data);
          };
        }}
        helpText={helpText}
        swapOut={swapOut}
      />,
      target[0],
    );
  }
}

module.exports = BasicEditor;

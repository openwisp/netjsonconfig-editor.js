const JsonEditor = require('jsoneditor');
const $ = require('jquery');

require('../themes/tomorrow_night_bright');

/**
 * Represents an instance of the Advanced Editor.
 * @typedef {Object} AdvancedJSONEditor
 * @class AdvancedJSONEditor
 */
class AdvancedJSONEditor {
  /**
   * Represents an instance of the Advanced Editor.
   * @constructor
   * @param {object} props - propts containing the configs for the editor
   */
  constructor({target, schema, data, helpText, validate,
    onChange, jsonErrorMessage, swapOut, ajv}) {
    this.swapOut = swapOut;
    // set message to be used to alertwrong json
    this.setJsonErrorMessage(jsonErrorMessage);
    // disable validation if not required
    this.validate = validate;
    schema = validate ? schema : {};
    // build options for advanced mode
    const options = {
      mode: 'code',
      theme: 'ace/theme/tomorrow_night_bright',
      indentation: 4,
      onEditable: () => true,
      onChange: () => {
        try {
          if (this.schemaValid) {
            onChange(this.editor.get());
          }
        } catch (err) {
          return err;
        }
      },
      schema,
      ajv,
    };
    this.render({helpText, options, data, target});
  }

  /**
   * Renders the instance of the Advanced Editor.
   * @param {object} props - propts containing the helpText, options,
   * data, target for the editor
   */
  render({helpText, options, data, target}) {
    // create advanced mode element with jQuery and insert into the DOM
    this.container = $('<div class=\'advanced-mode full-screen\'></div>');
    this.container.appendTo($(target));
    // init editor
    this.editor = new JsonEditor(this.container[0], options, data);
    this.editor.aceEditor.setOptions({
      fontSize: 14,
      showInvisibles: true,
    });
    // remove powered by ace link
    this.container.find('.jsoneditor-menu a').remove();
    const that = this;
    // add controls to the editor header
    this.container.find('.jsoneditor-menu')
      .append($(`<a href="javascript:;" class="jsoneditor-exit">
                       back to normal mode
                   </a>`).click(() => {
        that.closeEditor();
      }))
      .append(`<label id="netjsonconfig-hint">
                     ${helpText}
                 </label>`);
    // resize event on window
    $(window).resize(() => {
      that.container.height($(window).height()).width(window.outerWidth);
    });
    this.container.hide();
  }
  /**
   * Used to show the advanced editor.
   */
  show() {
    $('body').addClass('editor-full');
    window.scrollTo(0, 0);
    this.container.show();
    this.active = true;
  }
  /**
   * Used to hide the advanced editor.
   */
  hide() {
    $('body').removeClass('editor-full');
    this.container.hide();
    this.active = false;
  }
  /**
   * Used to change the current schema in the advanced editor.
   * @param {object} schema - new schema tobe used to for validation
   */
  changeSchema(schema) {
    this.editor.setSchema(schema);
  }
  /**
   * Used to set the json data within the advanced editor.
   * @param {object} json - new json data to be set within editor
   */
  setJson(json) {
    this.editor.set(json);
  }
  /**
   * Used to check wether the json data within the editor is valid
   * in the advanced editor.
   * @return {boolean} whether or not the data is valid
   */
  get schemaValid() {
    return this.editor.validateSchema(this.editor.get());
  }
  /**
   * used to close the advanced editor and call the swapOut callback
   * @callback {func} swapOut
   */
  closeEditor() {
    if (this.validate && this.schemaValid) {
      this.swapOut();
    } else {
      this.alertInvalidJSON();
    }
  }

  /**
   * Send an alert to indicate json entered is invalid, as per schema
   */
  alertInvalidJSON() {
    alert(this.jsonErrorMessage);
  }

  /**
   * set invalid json error message
   * @param {String} jsonErrorMessage - String containing error for invalid json
   */
  setJsonErrorMessage(jsonErrorMessage) {
    this.jsonErrorMessage = jsonErrorMessage;
  }

  /**
   * Method use to destroy the advanced Editor and free resources
   * @return {Promise}
   */
  destroy() {
    let that = this;
    return new Promise((resolve, reject) => {
      that.container.remove();
      $(window).unbind('resize');
      resolve();
    });
  }
}

module.exports = AdvancedJSONEditor;

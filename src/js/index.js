let AdvancedEditor = require('./advanced/index');
let $ = require('jquery');
let BasicEditor = require('./basic/index');

require('../css/index.less');
/**
 * Represents an instance of the NetjsonEditor class.
 * @typedef {Object} NetjsonEditor
 * @class NetjsonEditor
 */
class NetjsonEditor {
  /**
    * Constructor to initialise the netjsonConfigEditor
    * @constructs NetjsonEditor
    * @param {object} props
    * @type {object}
  */
  constructor({target = '#netjsonconfig-area',
    schema = {}, data = {}, helpText, jsonError = 'Json entered is invalid',
    validate = true, onChange = () => {}}) {
    this.targetElement = $(target);
    this.targetElement.hide();

    this.schema = schema;
    let onChangeCb = onChange? onChange: () => {};

    onChange = (data) => {
      this.changed(onChangeCb, data);
    };

    helpText = helpText? helpText:
          `Want learn to use the advanced mode? Consult the
          <a href='http://netjsonconfig.openwisp.org/en/stable/general/basics.html'
             target='_blank'>netjsonconfig documentation
          </a>.`;

    this.props = {target, helpText, data, schema,
      validate, onChange, jsonError};
    this.render(this.props);
    this.setJson(data);
  }
  /**
   * Method used to render the instance of the editor.
   * @param {Object} props
   */
  render({helpText, data, schema, validate, onChange, jsonError}) {
    this.container = $(`<div class='netjsoneditor-config'></div>`);
    this.container.insertBefore($(this.targetElement));

    this.initAdvancedEditor({target: this.container, helpText,data,
      schema,validate, onChange, jsonError});
    this.initBasicEditor({target: this.container, helpText, data,
      schema, validate, onChange, jsonError});
  }
  /**
   * Method used to initialise the advanced editor module.
   * @param {Object} props
   */
  initAdvancedEditor({target, helpText, data, schema,
    validate, onChange, jsonError}) {
    const element = $(`<div class='advanced_editor_container'></div>`);
    element.appendTo($(target));
    this.advancedEditor = new AdvancedEditor({target: element,
      helpText, data, schema, validate, onChange,
      jsonErrorMessage: jsonError,
      swapOut: () => this.showBasiceEditor()});
  }
  /**
   * Method used to initialise the basic editor module.
   * @param {Object} props
   */
  initBasicEditor({target, helpText, data, schema,
    validate, onChange, jsonError}) {
    const element = $(`<div class='basic_editor_container'></div>`);
    element.appendTo($(target));
    this.basicEditor = new BasicEditor({target: element,
      helpText, data, schema, validate,
      onChange, jsonError,
      swapOut: () => this.showAdvancedEditor()});
  }
  /**
   * Method Method fired when data in the editor is changed.
   * @param {func} onChange
   * @param {object} data
   * @callback onChange
   */
  changed(onChange, data) {
    this.targetElement.val(JSON.stringify(data));
    onChange();
  }
  /**
   * Method used to change the schema used in all editor modules.
   * @param {Object} schema
   */
  changeSchema(schema) {
    this.schema = schema;
    this.advancedEditor.changeSchema(schema);
    this.basicEditor.setSchema(schema, this.json);
  }
  /**
   * Method used to focus the advanced editor module.
   */
  showAdvancedEditor() {
    this.setJson(JSON.parse(this.targetElement.val()));
    this.basicEditor.hide();
    this.advancedEditor.show();
  }
  /**
   * Method used to focus the basic editor module.
   */
  showBasiceEditor() {
    this.setJson(JSON.parse(this.targetElement.val()));
    this.basicEditor.show();
    this.advancedEditor.hide();
  }
  /**
   * proptery containing the text version of the data within the editor.
   * @return {String} text
   */
  get text() {
    return this.targetElement.val();
  }
  /**
   * property containing the json data within the editor.
   * @return {Object} json
   */
  get json() {
    return JSON.parse(this.targetElement.val());
  }
  /**
   * Setter method for the schema property
   * @param {Object} schema
   */
  set schema(schema) {
    this.hschema = schema;
  }
  /**
   * setter method for the json data within the editor.
   * @param {Object} json
   */
  setJson(json) {
    this.targetElement.val(JSON.stringify(json));
    this.advancedEditor.setJson(json);
    this.props.data = json;
    this.basicEditor.setData(json);
  }
  /**
   * getter method for the json schema being used within the editor.
   * @return {Object} schema
   */
  get schema() {
    return this.hschema;
  }
}

window.netjsonEditor = module.exports = NetjsonEditor;

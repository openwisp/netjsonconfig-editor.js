let AdvancedEditor = require('./advanced/index');
let $ = require('jquery');
let BasicEditor = require('./basic/index');
const Ajv = require('ajv');
const metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');

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
    validate = true, onChange = () => {}, name = 'Netjsonconfig Editor'}) {
    this.targetElement = $(target);
    this.targetElement.hide();

    this.schema = schema;
    this.eventCallbacks = {
      change: onChange,
    };

    onChange = (data) => {
      let json = this.json;
      this.changed(data);
      if (json!==data) {
        this.eventCallbacks.change();
      }
    };

    helpText = helpText? helpText:
          `Want learn to use the advanced mode? Consult the
          <a href='http://netjsonconfig.openwisp.org/en/stable/general/basics.html'
             target='_blank'>netjsonconfig documentation
          </a>.`;

    this.props = {
      target, helpText, data, schema,
      validate, onChange, jsonError, name,
    };
    this.render(this.props);
    this.setJson(data);
  }
  /**
   * Method used to render the instance of the editor.
   * @param {Object} props
   */
  render({helpText, data, schema, validate, onChange, jsonError, name}) {
    this.container = $(`<div class='netjsoneditor-config'></div>`);
    this.container.insertBefore($(this.targetElement));
    // code to make sure we use ajv for draft 04 schemas which we need
    const ajv = new Ajv({
      meta: false, // optional, to prevent adding draft-06 meta-schema
      extendRefs: true, // optional, current default is to 'fail'
      unknownFormats: 'ignore', // optional, current default is true (fail),
      allErrors: true,
    });
    ajv.addMetaSchema(metaSchema);
    ajv._opts.defaultMeta = metaSchema.id;
    // optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
    ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema';
    // optionally you can also disable keywords defined in draft-06
    ajv.removeKeyword('propertyNames');
    ajv.removeKeyword('contains');
    ajv.removeKeyword('const');

    this.initAdvancedEditor({
      target: this.container, helpText, data, ajv,
      schema, validate, onChange, jsonError, name,
    });
    this.initBasicEditor({
      target: this.container, helpText, data,
      schema, validate, onChange, jsonError, name,
    });
  }
  /**
   * Method used to initialise the advanced editor module.
   * @param {Object} props
   */
  initAdvancedEditor({target, helpText, data, schema, ajv,
                      validate, onChange, jsonError, name}) {
    const element = $(`<div class='advanced_editor_container'></div>`);
    element.appendTo($(target));
    this.advancedEditor = new AdvancedEditor({
      target: element,
      helpText, data, schema, validate, onChange,
      jsonErrorMessage: jsonError,
      swapOut: () => this.showBasiceEditor(),
      name, ajv,
    });
  }
  /**
   * Method used to initialise the basic editor module.
   * @param {Object} props
   */
  initBasicEditor({target, helpText, data, schema,
                   validate, onChange, jsonError, name}) {
    const element = $(`<div class='basic_editor_container'></div>`);
    element.appendTo($(target));
    this.basicEditor = new BasicEditor({
      target: element,
      helpText, data, schema, validate,
      onChange, jsonError,
      swapOut: () => this.showAdvancedEditor(),
      name,
    });
  }
  /**
   * Method Method fired when data in the editor is changed.
   * @param {object} data
   * @callback onChange
   */
  changed(data) {
    this.targetElement.val(JSON.stringify(data));
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
  /**
  * Function to be used to validate the data within the editor
  * @return {boolean} valid
  */
  validate() {
    this.setJson(this.json);
    return this.advancedEditor.schemaValid;
  }
  /**
  * Function to be used to set event listeners within the editor
  * @param {string} event
  * @param {func} cb - callback
  */
  on(event, cb) {
    this.eventCallbacks[event] = cb;
  }
  /**
  * Function to be used to clear event listeners within the editor
  * @param {string} event
  */
  off(event) {
    this.eventCallbacks[event] = () => {};
  }
  /**
  * Function to destroy the editor and free up resources
  * @return {Promise}
  */
  destroy() {
    let that = this;
    return new Promise((resolve, reject) => {
      if (that.basicEditor.active) {
        that.advancedEditor.destroy().then(() => {
          that.advancedEditor = null;
          that.basicEditor.destroy().then(() => {
            that.basicEditor = null;
            resolve(that.json);
            that = null;
          });
        });
      } else if (that.advancedEditor.active) {
        that.basicEditor.destroy().then(() => {
          that.basicEditor = null;
          that.advancedEditor.destroy().then(() => {
            that.advancedEditor = null;
            resolve(that.json);
            that = null;
          });
        });
      } else {
        reject();
      }
    });
  }
}

window.netjsonEditor = module.exports = NetjsonEditor;

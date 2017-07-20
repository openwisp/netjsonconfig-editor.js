const JsonEditor = require('jsoneditor');
const $ = require('jquery');
const Ajv = require('ajv');
const metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');

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
    onChange, jsonErrorMessage, swapOut}) {
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
    };
    this.render({helpText, options, data, target});
  }

  /**
  * Renders the instance of the Advanced Editor.
  * @param {object} props - propts containing the helpText, options,
  * data, target for the editor
  */
  render({helpText, options, data, target}) {
    // code to make sure we use ajv for draft 04 schemas which we need
    const ajv = new Ajv({
      meta: false, // optional, to prevent adding draft-06 meta-schema
      extendRefs: true, // optional, current default is to 'fail'
      unknownFormats: 'ignore',  // optional, current default is true (fail)
    });

    ajv.addMetaSchema(metaSchema);
    ajv._opts.defaultMeta = metaSchema.id;

    // optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
    ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema';

    // Optionally you can also disable keywords defined in draft-06
    ajv.removeKeyword('propertyNames');
    ajv.removeKeyword('contains');
    ajv.removeKeyword('const');


    // create advanced mode element with jQuery and insert into the DOM
    this.element = $('<div class=\'advanced-mode full-screen\'></div>');
    this.element.appendTo($(target));

    this.editor = new JsonEditor(this.element[0], {...options, ajv}, data);
    this.editor.aceEditor.setOptions({
      fontSize: 14,
      showInvisibles: true,
    });

    // remove powered by ace link
    this.element.find('.jsoneditor-menu a').remove();

    const that = this;

    // add controls to the editor header
    this.element.find('.jsoneditor-menu')
            .append($(`<a href="javascript:;" class="jsoneditor-exit">
                            back to normal mode
                        </a>`,
                ).click(() => {
                  that.closeEditor();
                }))
            .append(`
                <label id="netjsonconfig-hint">
                    ${helpText}
                </label>
        `);

    $(window).resize(() => {
      that.element.height($(window).height()).width(window.outerWidth);
    });

    this.element.hide();
  }
  /**
   * Used to show the advanced editor.
   */
  show() {
    $('body').addClass('editor-full');
    window.scrollTo(0, 0);
    this.element.show();
    this.active = true;
  }
  /**
   * Used to hide the advanced editor.
   */
  hide() {
    $('body').removeClass('editor-full');
    this.element.hide();
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
}

module.exports = AdvancedJSONEditor;

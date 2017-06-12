# netjson-editor.js

description to be added

## Installation
 
 installation to be added after publishing

## Usage

To use the editor, include the editor within the view and create a new instance as follows
```javascript
	var editor = new netjsonEditor(options);
```
the various otpions available for the editor are as below. Default values will be used for any option which is not provided.

1. **target**: target html element where the editor content will be stored. It should be an html input element like `<input type="text" />` or `<textarea></textarea>`. _Default_: `#netjsonconfig-area`
2. **schema**: This option receives the schema to be use to validate the content of the editor against. This should be a schema.org valid json schema. _Default_: `{}`
3. **data**: The initial content to be populated within the editor on initialisation. This option receives a valid json object as parameter. _Default_: `{}`
4. *helpText**: This option is used to set the default help text to be diaplayed at the top center of both the advanced editor and the basic editor. _Default_: `Want learn to use the advanced mode? Consult the  <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html" target="_blank">netjsonconfig documentation </a>.`
5. **validate**: This is a boolean value. if true the data within the editor will be validated against the schema else it will not be validated. _Defualt_: true
6. **onChange**: this is a callback reference. This is called when the content of the editor is changed. it is triggered wen the user edits the netjsonconfigs. _Default_: `null`
7. **jsonError**: String error message to be displayed when the json within the editor is invalid and the user tries to exit the editor. _Default_: `"Json entered is invalid"`

## Contribution
	To contribute to this repo, please visit the community contribution guidelines

### Development Setup
To setup this project for development do the following

1. Fork the repository.
2. Clone the repository locally using `git clone`.
3. Enter the local project's root folder `cd netjsonconfig-editor.js`
4. Install javascript dependencies. run `npm install`
5. You should be ready to go.
6. Run `npm start` to start the development server to view any of the examples
7. Run `npm run build` to build the library and `npm run watch` to watch files for changes.
8. Run `npm run watch` to run a watch server to instantly build the javascript on change of any files.

Visit [scripts section](#) to see full details on scripts to run for various actions during development

### Tests
In order to run tests for the code written run the command `npm run test`
writing tests is an essential part of the project. All new features added to the editor need to be accompanied with appropriate tests, but also ensuring that tets written before do not fail. 
netjsonconfig-editor.js uses mocha js as the test framework, chaijs as the assertion library and phantomjs as the virtual DOM for command line tests To get started with tests, there are two options. 
1. short  or simple tests will be added to the `test/tests.js` file. 
2. larger or more complex tests will be added in new files in the `test/` folder and then loaded into the test runner by being included into the `testRunner.html` file through a script tag. like: `<script src="test/tests.js"></script>`


### Examples
In order visualize the various features of teh editor during development, various examples are added. Each example is used to show one or more features on within the browser. examples are html files and are stored in the `examples/` folder at the root of the project.

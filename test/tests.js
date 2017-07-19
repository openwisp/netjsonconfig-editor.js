
describe('Netjson Editor', function() {
    // require('mocha-jsdom')();
    // var expect = require('chai').expect;

    var editor;

    function makeSuite(name, opts, tests) {
        describe(name, function () {
            before(function () {
                editor = new netjsonEditor(opts);
            });
            tests();
            after(function () {
                console.log("shared after "+name);
            });
        });
    }

    var tests = function() {
        describe("Tests", function () {


            it('Should have a property called props which is an object and is the object passed to the editor\'s constructor', function(){
                expect(editor).to.have.a.property('props');
                expect(editor.props).to.be.an('object');
            }); 

            it("Should always have a default data object that is either empty or equal to the data passed", function(){
                expect(editor.json).to.deep.equals(editor.props.data);
            });

            it('Should have a property called advancedEditor', function () {
                expect(editor).to.have.a.property('advancedEditor');
            });

            it('Should have a property called targetElement', function() {
                expect(editor).to.have.a.property('targetElement');
            });

            it("Should always have a a property called onChangeCb", function(){
                expect(editor).to.have.a.property('container');
            });

            it('Should have a property called schema', function() {
                expect(editor).to.have.a.property('schema');
                expect(editor.schema).to.be.an('object');
            });
            
            it('Should have a property called basicEditor', function(){
                expect(editor).to.have.a.property('basicEditor');
            });

            it('Should have a text property equals to the stringified json property', function() {
                expect(editor.text).to.equals(JSON.stringify(editor.json));
            });

            var newJson = {
                "name": "name",
                "email": "email"
            };
            it("Should have json data equals "+JSON.stringify(newJson)+" which is new json set", function () {
                editor.setJson(newJson);
                expect(editor.json).to.be.deep.equals(newJson);
            });

            it("Should have the basicEditor visible on startup", function() {
                expect(editor.container.children(".basic_editor_container").css("display")).to.not.be.equals('none'); 
            });

            it("Should have the advancedEditor hidden on startup", function() {
                expect(editor.container.children(".advanced_editor_container").css("display")).to.be.equals('none'); 
            });
        });
    };

    makeSuite('initialised with empty object', {}, function(){
        tests();
    });

    opts = {
                data: {
                   "files": [
                        {
                            "path": "the",
                            "mode": "ysys",
                            "contents": "ysysy"
                        }
                    ]
                }, 
                onChange: function(){
                    console.log('hello');
                }, 
                schema: {},
                validate: true
            };
    makeSuite('initialised with '+JSON.stringify(opts)+' object', opts, function(){
        tests();
    });

    opts = {
        helpText: "No text here <b>oh there is</b>", 
        data: {
            man: "hello"
        }, 
        onChange: function(){
            console.log('hello');
        }
    };

    makeSuite('initialised with '+JSON.stringify(opts)+' object', opts, function(){
        tests();
    });

});

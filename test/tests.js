describe('Netjson Editor', function() {
    var editor;
    
    var tests = function() {
        
        it('should have a property called props which is an object and is the object passed to the editor\'s constructor', function(){
            expect(editor).to.have.a.property('props');
            expect(editor.props).to.be.an('object')
        });	

        it("should always have a default data object that is either empty or equal to the data passed", function(){
            expect(editor.json).to.deep.equals({});
        });

        it('should have a property called advancedEditor', function () {
            expect(editor).to.have.a.property('advancedEditor');
        });

        it('should have a property called targetElement', function() {
        	expect(editor).to.have.a.property('targetElement');
        });

        it("should always have a a property called onChangeCb", function(){
            expect(editor).to.have.a.property('container');
        });

        it('should have a property called schema', function() {
        	expect(editor).to.have.a.property('schema');
            expect(editor.schema).to.be.an('object')
        });
        
        it('should have a property called basicEditor', function(){
            expect(editor).to.have.a.property('basicEditor');
        });

        it('should have a text property equals to the stringified json property', function() {
            expect(editor.text).to.equals(JSON.stringify(editor.json));
        });

    };

    editor = new netjsonEditor({});
    describe('initialised with empty object', tests);
});

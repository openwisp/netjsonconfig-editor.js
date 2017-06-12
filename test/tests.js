describe('Netjson Editor', function() {
    var editor;
    
    var tests = function() {
        it("should always have a a property called onChangeCb", function(){
        	expect(editor).to.have.a.property('onChangeCb');
        });

        it("should always have an empty default data object", function(){
        	expect(editor.json).to.deep.equals({});
        });

        it('should have an empty schema object', function(){
        	expect(editor.schema).to.deep.equals({});
        });	

        it('should have a property called advancedEditor', function () {
            expect(editor).to.have.a.property('advancedEditor');
        });

        it('should have a property called targetElement', function() {
        	expect(editor).to.have.a.property('targetElement');
        });

        it('should have a property called _schema', function() {
        	expect(editor).to.have.a.property('_schema');
        });
        
        it('should have a property called basicEditor');

        it('should have a text property equals to the stringified json property', function() {
         expect(editor.text).to.equals(JSON.stringify(editor.json));
     });

    };

    editor = new netjsonEditor({});
    describe('initialised with empty object', tests);
});

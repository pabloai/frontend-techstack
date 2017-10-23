
describe("Index", function() {
    let entry, testMod = null;

    beforeEach(function() {
        entry = {
            index: require('../src/app/js/index')
        };

    });
    it('is defined', function () {
        expect(entry.index).toBeDefined();
    });
    it('returns an object with two functions', function() {
        let testObj = entry.index();
        expect(typeof testObj).toBe('object');
        expect(testObj.module1).toBeDefined();
        expect(testObj.module2).toBeDefined();
    }); 
});


describe("Module 2", function() {

    let mod2 = null,
        entry = {mod2_fn: null};

    beforeEach(function () {
        entry.mod2_fn = require('../src/app/js/module2/module2');
        mod2 = entry.mod2_fn();
    });

    it('is included correctly', function () {
        expect(typeof entry.mod2_fn).toBe('function');
    });

    it('resolves a string', function () {
        expect(typeof mod2).toBe('string');
    });

    it('returns correct string', function () {
        expect(mod2).toBe('abc');
    });
});

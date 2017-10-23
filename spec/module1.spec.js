
describe("Module 1", function() {

    let mod1 = null,
        entry = {mod1_fn: null};

    beforeEach(function () {
        entry.mod1_fn = require('../src/app/js/module1/module1');
        mod1 = entry.mod1_fn();
    });

    it('is included correctly', function () {
        expect(typeof entry.mod1_fn).toBe('function');
    });

    it('resolves an object', function () {
        expect(typeof mod1).toBe('object');
    });

    it('returns a resolution object with one function', function () {
        expect(mod1.getUserAgent).toBeDefined();
    });

    describe('getUserAgent fn', function () {

        it('returns the correct user agent', function () {
            expect(mod1.getUserAgent()).toBe(window.navigator.userAgent);
        });
    });
});

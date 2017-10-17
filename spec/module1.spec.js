describe("Module 1 launches correctly", function() {
  it("and returns a public object with one function", function() {

    let mod1 = require('../src/app/js/module1/module1'),
        userAgent = window.navigator.userAgent;
    mod1();
    expect(mod1.getUserAgent).toBeDefined();
    expect(mod1.getUserAgent()).toEqual(userAgent);
  });
});
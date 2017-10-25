
'use strict';
let index;
(index = function() {
    var self = {};
    self.module1 = require('./module1/module1');
    self.module2 = require('./module2/module2');
    self.module1();
    self.module2();
    return self;
})();

module.exports = index;

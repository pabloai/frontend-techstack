
'use strict';
function index() {
    var self = {};
    self.module1 = require('./module1/module1');
    self.module2 = require('./module2/module2');
    return self;
}

module.exports = index;

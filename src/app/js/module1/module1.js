
/**
 * Represents module1.
 * @module module1
 */
function module1() {

    var self = this;
    self.getUserAgent = getUserAgent;
    return self;

    /**
	 * Return the userAgent of the browser.
	 * @func getUserAgent
	 */
    function getUserAgent() {
        return window.navigator.userAgent;
    }
}

module.exports = module1;


/**
 * Represents module1.
 * @module module1
 */
function module1() {
    let self = this;
    init();
    return self;

    function init() {
        self.getUserAgent = getUserAgent;

        console.log('Hello, World!');
    }

    /**
	 * Return the userAgent of the browser.
	 * @func getUserAgent
	 */
    function getUserAgent() {
        return window.navigator.userAgent;
    }
}

module.exports = module1;


function module1() {

	let self = this;
	self.getUserAgent = getUserAgent
	return self;

	function getUserAgent() {
		return window.navigator.userAgent;
	}
}

module.exports = module1

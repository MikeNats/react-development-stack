const isTextRendened = require('../support/checks/isTextRendened');

module.exports = function then() {
	
	this.Then(/^I expect "([^"]*)?" text to be rendered$/, isTextRendened);
};
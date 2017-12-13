var assert = require('assert');

function sortClasses (str) {
	return str.split(' ').sort().join(' ');
}

function runChecks (local, npm, fixture) {
	// sort assertions
	assert.equal(sortClasses(local.apply(null, fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(npm.apply(null, fixture.args)), sortClasses(fixture.expected));
}

module.exports = runChecks;

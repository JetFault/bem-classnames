var benchmark = require('benchmark');

function runSuite (local, npm, fixture, log) {
	var suite = new benchmark.Suite();

	suite.add('local#' + fixture.description, function () {
		local('b').apply(null, fixture.args);
	});

	suite.add('  npm#' + fixture.description, function () {
		npm('b').apply(null, fixture.args);
	});

	// after each cycle
	suite.on('cycle', function (event) {
		log('* ' + String(event.target));
	});

	// other handling
	suite.on('complete', function () {
		log('\n> Fastest is' + (' ' + this.filter('fastest').pluck('name').join(' | ')).replace(/\s+/, ' ') + '\n');
	});

	suite.on('error', function (event) {
		log(event.target.error.message);
		throw event.target.error;
	});

	suite.run();
}

module.exports = runSuite;

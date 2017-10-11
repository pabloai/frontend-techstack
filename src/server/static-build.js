
'use strict';

const build = require('./build'),
	env = process.argv[2] ? process.argv[2] : 'dev';

compile()

function compile() {
	build.refresh(() => {
		build.js(env);
		build.sass(env);
		build.pug();
	});
}
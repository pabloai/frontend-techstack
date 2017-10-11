
'use strict';

const build = require('./build'),
	env = process.argv[2] ? process.argv[2] : 'dev';

build.startup(() => {
	build.bundleExternal(() => {
		build.js(env);
	});
	build.sass(env);
	build.pug();
});
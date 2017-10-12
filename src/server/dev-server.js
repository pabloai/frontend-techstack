function devServer() {
	'use strict';

	//components
	const express = require('express'),
		app = express(),
		chalk = require('chalk'),
		morgan = require('morgan'),
		path = require('path'),
		VARS = require('./dir-vars'),
		location = path.join(__dirname, '..', '..', VARS.out);

	app.use(morgan('dev'));

	console.info(chalk.blue('Now listening at port:' + VARS.port));
	console.info(chalk.blue('Please visit http://localhost:' + VARS.port + ' in your browser for development.'));
	console.info(chalk.blue('Directory location: ' + location));

	app.get('/', function(req, res) {
		res.sendFile(req.url, {root: location}, (err) => {
			if(err) {
				res.status(err.status).end();
			}
		});
	});

	app.use(express.static(location));

	app.listen(VARS.port);

}

module.exports = devServer;
var Controller = require('./controller');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */


exports.register = function (server, options, next) {

	var prefix = "/locations";

	var endpoints = [

		{ method: 'GET',	path: prefix + '',					config: Controller.index}

	];

	server.route(endpoints);

	next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};



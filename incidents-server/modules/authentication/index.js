var Controller = require('./controller');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */


exports.register = function (server, options, next) {

	var prefix = "/auth";
	var service = require("./service");
		service.setStrategy(server);

	var endpoints = [

		{ method: 'POST',	path: prefix + '/token',					config: Controller.getToken},
		{ method: 'POST',	path: prefix + '/refresh',					config: Controller.refresh},
		{ method: 'GET',	path: prefix + '/test',						config: Controller.test}

	];

	server.route(endpoints);
	next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};



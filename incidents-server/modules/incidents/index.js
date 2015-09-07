
exports.register = function (server, options, next) {

	var prefix = "/incidents";
	var Controller = require('./controller')(server);

	var endpoints = [

		{ method: 'GET',	path: prefix + '',					config: Controller.index},
		{ method: 'PUT',	path: prefix + '/{incidentId}',		config: Controller.edit},
		{ method: 'POST',	path: prefix + '',					config: Controller.create}

	];

	server.route(endpoints);

	next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};



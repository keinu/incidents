var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: '127.0.0.1',
    port: 8000,
    routes: {
		cors: true
    }
});

server.register(require('hapi-auth-jwt'), function (error) {
	if (error) {
		throw error;
	}
});

server.register([
	require('./modules/authentication'),
	require('./modules/incidents'),
	require('./modules/locations')
], function (error) {
	if (error) {
		throw error;
	}
});


server.on('request', function(request, event, tags) {
    console.log(event);
});

server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

// Start the server
server.start(function(err) {
	console.log(err);
     console.log('Server running at:', server.info.uri);
});
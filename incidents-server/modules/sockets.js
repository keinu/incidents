module.exports = function(server) {

	var io = require('socket.io')(server.listener);
		io.on('connection', function (socket) {
			console.log("New socket ", socket.id);
		});

	return io;

};

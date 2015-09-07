var jwt = require('jsonwebtoken');

var authService = require("./service"),
	db = require("../database.js");

exports.test = {

	handler: function (request, reply) {

		reply({test: "ok"});

	}

};

exports.getToken = {

	handler: function (request, reply) {

		var user = authService.getValidUser(request.payload);
		if (user) {

			// Expires in 5 minutes
			user.exp = authService.getExpiration(5);

			return reply({
				token: jwt.sign(user, authService.getPrivateKey())
			});

		}

		reply({errors: ["This username and password do not match"]}).code(401);

	}

};

exports.refresh = {

	handler: function (request, reply) {

    	var token = request.payload.token;

		jwt.verify(token, authService.getPrivateKey(), function(err, user) {

			if (err) {
				reply({error: "Bad token"});
			}

	    	user = authService.getValidUser(user);
			if (user) {

				// Expires in 5 minutes
				user.exp = authService.getExpiration(5);

				return reply({
					token: jwt.sign(user, authService.getPrivateKey())
				});

			}

			reply({token: {}}).code(401);

		});


    }

};


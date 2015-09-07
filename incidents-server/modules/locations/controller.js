var db = require("../database.js");

exports.index = {
	auth: {
		strategy: 'token'
	},
	handler: function (request, reply) {

    	var query = {
			document: "location"
    	};

		db.find(query, function(err, doc) {

    		if (err) {
    			return reply(err);
    		}

			reply({
				"locations": doc
			});

    	});

	}

};

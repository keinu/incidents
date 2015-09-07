var db = require("../database.js");

module.exports = function(server) {

    var io = require("../sockets.js")(server);

    var index = {
        auth: {
            strategy: 'token'
        },
        handler: function (request, reply) {

            var query = {
                document: "incident"
            };

            if (request.query && request.query.location) {
                query.location = request.query.location;
            }

            db.find(query).sort({ time: -1 }).limit(10).exec(function(err, doc) {

                if (err) {
                    return replye(err);
                }

                reply({
                    "incidents": doc
                });

            });

        }

    };

    var edit = {
        auth: {
            strategy: 'token'
        },
        handler: function (request, reply) {

            var query = request.payload.incident;
                query.lastModified = new Date();

            db.update({ _id: request.params.incidentId}, { $set: query }, {  }, function(err, num) {

                if (err) {
                    return reply(err);
                }

                db.find({ _id: request.params.incidentId}, function(err, doc) {

                    io.emit("incident-update", doc[0]);

                    reply({
                        "incidents": doc[0]
                    });

                });

            });

        }

    };

    var create = {
        auth: {
            strategy: 'token'
        },
        handler: function (request, reply) {

            var query = request.payload.incident;
                query.document = "incident";
                query.time = new Date();
                query.lastModified = new Date();

            if (!query.location) {
                return reply({});
            }

            db.insert(query, function (err, doc) {

                if (err) {
                    return replye(err);
                }

                io.emit("incident-create", doc);

                reply({
                    "incidents": doc
                });

            });

        }
    };

    return {
        index: index,
        edit: edit,
        create: create,
    };

};
module.exports = (function() {

	var Datastore = require('nedb'),
	    db = new Datastore({ filename: 'db', autoload: true });

	return db;

})();

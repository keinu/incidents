module.exports = (function() {

	var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

	var users = [{
        id: 1,
        username: 'admin',
        fullName: 'Mr Adminis Trator',
        scope: ['admin'],
        password: 'password1'
    },{
        id: 2,
        username: 'simulator',
        fullName: 'Mr Sam Ulator',
        scope: ['simulator'],
        password: 'password1'
    },{
        id: 3,
        username: 'manager',
        fullName: 'Mr Bill Ding',
        scope: ['manager'],
        password: 'password1'
    }];

	var validate = function (request, decodedToken, callback) {

		var user = getValidUser(decodedToken);
		if (user) {
			return callback(null, true, user);
		}

		console.log("Invalid user found", decodedToken);

	    return callback(null, false, user);

	};

	var getValidUser = function(credentials) {

		var user = users.find(function(user) {

			if (user.username === credentials.username &&
				user.password === credentials.password) {
				return true;
			}

			return false;

		});

		return user;

	};

	var getPrivateKey = function() {

		return privateKey;

	};

	var getExpiration = function(minutes) {

		// Now in seconds
		var now = parseInt((new Date()).getTime() / 1000);

		return now + (60 * +minutes);

	};

	var setStrategy = function(server) {

		server.auth.strategy('token', 'jwt', {
		    key: privateKey,
		    validateFunc: validate
		});

	};


/*
 * find index polyfill
 */

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

	return {
		getPrivateKey: getPrivateKey,
		setStrategy: setStrategy,
		getValidUser: getValidUser,
		getExpiration: getExpiration
	};

})();
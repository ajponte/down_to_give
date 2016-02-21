'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var users = require('../../app/controllers/users.server.controller');

	// Users Routes
	app.route('/users')
		.get(users.list)
		.post(users.requiresLogin, users.create);

	app.route('/users/:userId')
		.get(users.read)
		.put(users.requiresLogin, users.hasAuthorization, users.update)
		.delete(users.requiresLogin, users.hasAuthorization, users.delete);

	// Finish by binding the User middleware
	app.param('userId', users.userByID);
};

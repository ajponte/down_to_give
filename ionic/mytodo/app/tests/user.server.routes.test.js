'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	User = mongoose.model('User'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, user;

/**
 * User routes tests
 */
describe('User CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new User
		user.save(function() {
			user = {
				name: 'User Name'
			};

			done();
		});
	});

	it('should be able to save User instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User
				agent.post('/users')
					.send(user)
					.expect(200)
					.end(function(userSaveErr, userSaveRes) {
						// Handle User save error
						if (userSaveErr) done(userSaveErr);

						// Get a list of Users
						agent.get('/users')
							.end(function(usersGetErr, usersGetRes) {
								// Handle User save error
								if (usersGetErr) done(usersGetErr);

								// Get Users list
								var users = usersGetRes.body;

								// Set assertions
								(users[0].user._id).should.equal(userId);
								(users[0].name).should.match('User Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save User instance if not logged in', function(done) {
		agent.post('/users')
			.send(user)
			.expect(401)
			.end(function(userSaveErr, userSaveRes) {
				// Call the assertion callback
				done(userSaveErr);
			});
	});

	it('should not be able to save User instance if no name is provided', function(done) {
		// Invalidate name field
		user.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User
				agent.post('/users')
					.send(user)
					.expect(400)
					.end(function(userSaveErr, userSaveRes) {
						// Set message assertion
						(userSaveRes.body.message).should.match('Please fill User name');
						
						// Handle User save error
						done(userSaveErr);
					});
			});
	});

	it('should be able to update User instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User
				agent.post('/users')
					.send(user)
					.expect(200)
					.end(function(userSaveErr, userSaveRes) {
						// Handle User save error
						if (userSaveErr) done(userSaveErr);

						// Update User name
						user.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing User
						agent.put('/users/' + userSaveRes.body._id)
							.send(user)
							.expect(200)
							.end(function(userUpdateErr, userUpdateRes) {
								// Handle User update error
								if (userUpdateErr) done(userUpdateErr);

								// Set assertions
								(userUpdateRes.body._id).should.equal(userSaveRes.body._id);
								(userUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Users if not signed in', function(done) {
		// Create new User model instance
		var userObj = new User(user);

		// Save the User
		userObj.save(function() {
			// Request Users
			request(app).get('/users')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single User if not signed in', function(done) {
		// Create new User model instance
		var userObj = new User(user);

		// Save the User
		userObj.save(function() {
			request(app).get('/users/' + userObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', user.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete User instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User
				agent.post('/users')
					.send(user)
					.expect(200)
					.end(function(userSaveErr, userSaveRes) {
						// Handle User save error
						if (userSaveErr) done(userSaveErr);

						// Delete existing User
						agent.delete('/users/' + userSaveRes.body._id)
							.send(user)
							.expect(200)
							.end(function(userDeleteErr, userDeleteRes) {
								// Handle User error error
								if (userDeleteErr) done(userDeleteErr);

								// Set assertions
								(userDeleteRes.body._id).should.equal(userSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete User instance if not signed in', function(done) {
		// Set User user 
		user.user = user;

		// Create new User model instance
		var userObj = new User(user);

		// Save the User
		userObj.save(function() {
			// Try deleting User
			request(app).delete('/users/' + userObj._id)
			.expect(401)
			.end(function(userDeleteErr, userDeleteRes) {
				// Set message assertion
				(userDeleteRes.body.message).should.match('User is not logged in');

				// Handle User error error
				done(userDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		User.remove().exec();
		done();
	});
});
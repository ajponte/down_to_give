'use strict';

//Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('listUsers', {
			url: '/users',
			templateUrl: 'modules/users/views/list-users.client.view.html'
		}).
		state('createUser', {
			url: '/users/create',
			templateUrl: 'modules/users/views/create-user.client.view.html'
		}).
		state('viewUser', {
			url: '/users/:userId',
			templateUrl: 'modules/users/views/view-user.client.view.html'
		}).
		state('editUser', {
			url: '/users/:userId/edit',
			templateUrl: 'modules/users/views/edit-user.client.view.html'
		});
	}
]);
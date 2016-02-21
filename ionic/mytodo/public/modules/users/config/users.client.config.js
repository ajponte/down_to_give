'use strict';

// Configuring the Articles module
angular.module('users').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Users', 'users', 'dropdown', '/users(/create)?');
		Menus.addSubMenuItem('topbar', 'users', 'List Users', 'users');
		Menus.addSubMenuItem('topbar', 'users', 'New User', 'users/create');
	}
]);
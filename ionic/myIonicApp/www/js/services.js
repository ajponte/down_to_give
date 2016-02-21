angular.module('starter.services', [])

/****************************************************/
/* START OF PROFILE FACTORY
/****************************************************/

.factory('Profile', function() {
    /*
    $scope.username = "mclovin86";
    $scope.homeTown = "San Francisco";
    $scope.favTeam = "Oakland Raiders";
    $scope.favCharity = "Salvation Army";
    $scope.donationAmt = 5;
    $scope.totalDonations = 30;
    $scope.totalWins = 30;
    $scope.totalChallenges = 10;
    $scope.totalWins = 8;
    $scope.winRatio = 0; 
    */
    var users = [];
    var username = "mclovin86";
    var homeTown = "San Francisco";
    var favTeam = "Oakland Raiders";
    var favCharity = "Salvation Army";
    var donationAmt = 5;
    var totalDonations = 30;
    var totalWins = 30;
    var totalChallenges = 10;
    var totalWins = 8;
    var winRatio = 0; // parseInt( #wins / #challenges )
    var user = {
      username: "mclovin86",
      homeTown: "San Francisco"

    };

    console.log("Building user");
  

    /*user.push(username);
    user.push(homeTown);
    user.push(favTeam);
    user.push(favCharity);
    user.push(donationAmt);
    user.push(totalDonations);
    user.push(totalWins);
    user.push(totalChallenges);
    user.push(totalWins);
    user.push(winRatio);*/
    return {
      all: function() {
        return user;
      }
    }
})
/****************************************************/
/* END OF PROFILE FACTORY
/****************************************************/


.factory(' ', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

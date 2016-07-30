
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $interval, RegLogin, $state, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.regData = {};
  $scope.errors = [];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.regModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };
  $scope.closeRegister = function() {
    $scope.regModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };
  $scope.register = function() {
    $scope.regModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.fbLogin = function() {
      RegLogin.fbLogin().then(function(res) {
          console.log(res);
          $scope.closeLogin();
          $scope.closeRegister();
          RegLogin.makeUser(
              'FACEBOOK USER',
              'haloartik-3ae2c',
              res.user.email,
              res.user.displayName
          );
          $localStorage.username = res.displayName;
          $state.go("app.main");
      });
  };

  RegLogin.getAllUsers().then(function(res){
      $scope.getUsers = res;
      console.log(res);
  });

  $scope.doRegister = function() {

      if($scope.regData.username == null) {
          var index = $scope.errors.push("אנא רשום שם משתמש");
      } else if($scope.regData.email == null) {
          var index = $scope.errors.push("אנא רשום אימייל");
      } else if($scope.regData.password == null) {
          var index = $scope.errors.push("אנא רשום סיסמא");
      } else if($scope.regData.repassword == null) {
          var index = $scope.errors.push("אנא רשום וידוא סיסמא");
      } else {
          if(!/^\w+$/.test($scope.regData.username)) {
              var index = $scope.errors.push("שם המשתמש חייב להיות בשפה האנגלית בלבד!");
          } else if($scope.regData.password != $scope.regData.repassword) {
              var index = $scope.errors.push("הסיסמאות אינן תואמות!");
          /*} else if(RegLogin.isUserExist($scope.regData.username)) {
              var index = $scope.errors.push("שם המשתמש כבר קיים!");
          /* } else if(RegLogin.isEmailExist($scope.regData.email)) {
              var index = $scope.errors.push("האימייל כבר קיים!");
              $timeout(removeErrors(index), 1500); */
          } else {
              /*
              RegLogin.makeUser(
                  $scope.regData.email,
                  $scope.regData.password,
                  //$scope.regData.username,
                  //$scope.regData.fname
              );
              */
              RegLogin.makeUser(
                  $scope.regData.username,
                  $scope.regData.password,
                  $scope.regData.email,
                  $scope.regData.fname
              );
              $scope.errors.push("נרשמת בהצלחה!");
              $timeout($scope.closeRegister, 1500);
          }
      }

      $interval(function() {
          $scope.errors.splice(0, 1);
      }, 3000);
  };

})

.controller('MainCtrl', function($scope, $location, $localStorage, RegLogin) {

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

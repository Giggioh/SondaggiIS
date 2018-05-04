'use strict';

var SondaggiIS = angular.module('SondaggiIS', ['ngRoute', 'ui.bootstrap']);
//Routes
SondaggiIS.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
      templateUrl: '/templates/index.html',
    }).when('/login', {
      templateUrl: '/templates/login.html',
      controller: 'LoginCtrl'
    }).when('/logout', {
      templateUrl: '/templates/login.html',
      controller: 'LogoutCtrl'
    }).when('/sondaggi', {
      templateUrl: '/templates/sondaggi.html',
      controller: 'ListaSondaggiCtrl'
    }).when('/edit/:id?', {
      templateUrl: '/templates/editSondaggio.html',
      controller: 'EditSondaggioCtrl'
    }).when('/sondaggio/:id', {
      templateUrl: '/templates/viewSondaggio.html',
      controller: 'ViewSondaggioCtrl',
    }).when('/error', {
      templateUrl: '/templates/error.html',
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

SondaggiIS.controller('SondaggiCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.prova='Giggio';
}]);

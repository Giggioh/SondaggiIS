var modules = ['zmTemplates', 'zmGlobalServices'];
var dependencies = ['ngSanitize'];
var isMobile = typeof(ionic)!=='undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
if(isMobile) {
    dependencies.push('ionic');
}
var server='https://sondaggiis.herokuapp.com';

'use strict';

var SondaggiIS = angular.module('SondaggiIS', ['ngRoute', 'ui.bootstrap']);    

//Routes
SondaggiIS.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
      templateUrl: 'templates/index.html',
    }).when('/register/:accountType?', {
      templateUrl: '/templates/register.html',
      controller: 'RegisterCtrl'
    }).when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    }).when('/logout', {
      templateUrl: 'templates/login.html',
      controller: 'LogoutCtrl'
    }).when('/sondaggi', {
      templateUrl: 'templates/sondaggi.html',
      controller: 'ListaSondaggiCtrl'
    }).when('/edit/:id?', {
      templateUrl: 'templates/editSondaggio.html',
      controller: 'EditSondaggioCtrl'
    }).when('/sondaggio/:id', {
      templateUrl: 'templates/viewSondaggio.html',
      controller: 'ViewSondaggioCtrl',
    }).when('/stats/:id', {
      templateUrl: 'templates/stats.html',
      controller: 'StatsCtrl',
    }).when('/error', {
      templateUrl: 'templates/error.html',
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

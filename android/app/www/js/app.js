var modules = ['zmTemplates', 'zmGlobalServices'];
var dependencies = ['ngSanitize'];
var isMobile = typeof(ionic)!=='undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
if(isMobile) {
    dependencies.push('ionic');
}
var server='http://192.168.1.93:80';

'use strict';

var SondaggiIS = angular.module('SondaggiIS', ['ngRoute', 'ui.bootstrap']);    
/*	.config(function ($locationProvider, $compileProvider, AnalyticsProvider) {
       //$locationProvider.html5Mode(true); // enable html5 mode
       // other pieces of code.
    })
    .run(function (application, $rootScope) {
       application.setPageTitle();
       $rootScope.$on('$stateChangeSuccess', function (event) {
          application.setPageTitle();
       });
       // other pieces of code.
   });
	if(isMobile) {
	   ngModule.run(function ($ionicPlatform) {
		   $ionicPlatform.ready(function() {
		   // Anything native should go here, like StatusBar.styleLightContent()
		   if (window.StatusBar) {
			  // org.apache.cordova.statusbar required
			  StatusBar.styleDefault();
		   }
		});
	}*/
//Routes
SondaggiIS.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
      templateUrl: '/templates/index.html',
    }).when('/register/:accountType?', {
      templateUrl: '/templates/register.html',
      controller: 'RegisterCtrl'
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
    }).when('/stats/:id', {
      templateUrl: '/templates/stats.html',
      controller: 'StatsCtrl',
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

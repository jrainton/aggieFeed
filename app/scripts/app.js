'use strict';

/**
 * @ngdoc overview
 * @name aggieFeedApp
 * @description
 * # aggieFeedApp
 *
 * Main module of the application.
 */
angular
  .module('aggieFeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

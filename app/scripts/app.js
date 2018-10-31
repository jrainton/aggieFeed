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
    'ngMaterial'
  ])
  .component('phoneList', {
    templateUrl: 'views/phoneList.html',
    controller: 'PhoneListController'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

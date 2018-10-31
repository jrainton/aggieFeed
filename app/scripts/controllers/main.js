'use strict';

/**
 * @ngdoc function
 * @name aggieFeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aggieFeedApp
 */

var app = angular.module('aggieFeedApp');

app.controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

app.controller('PhoneListController', function PhoneListController($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast?zip=95616,us&APPID=da933024abf8328d2a00837bc272b811'
  }).then(function (response){
    $scope.weather = response.data;
  },function (error){
    console.log(error);
  });
});



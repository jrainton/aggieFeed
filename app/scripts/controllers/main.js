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

//service call to API
app.service('weatherAPICall', function ($http){
  var weather = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast?zip=95616,us&APPID=da933024abf8328d2a00837bc272b811'
      }).then(function (response) {
        var allWeather = {list: []};
        //goes through all of the data in the list and adds it to variable ist above once it formats it to correct json for aggie feed
        for (let weatherReport in response.data.list) {
          if (response.data.list.hasOwnProperty(weatherReport)) {
            allWeather.list.push(format(response.data.list[weatherReport], response.data));
          }
        }
        return allWeather;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return weather;

});

//controller calls service API then waits on directive to use the data
app.controller('PhoneListController', function PhoneListController($scope, weatherAPICall) {

  $scope.weather = [];
  $scope.servicePromise = weatherAPICall.async();
});

//connects controller to directive and uses template weatherList.html to project the data
app.directive('ngWeather',
  function() {
    return {
      templateUrl: 'views/weatherList.html',
      restrict: 'EA',
      controller: 'PhoneListController',
      //able to manipulate the elements on the page
      link: function(scope, elem, attr) {
        //gets data
        scope.servicePromise.then(function (data) {
          scope.weather = data;
          var celcius = false;
          var weatherReport;

          //sets it as F to begin with
          for(var weatherReportIndex in scope.weather.list) {
            weatherReport = scope.weather.list[weatherReportIndex].activity;
              scope.weather.list[weatherReportIndex].activity.tempConversionMax = (weatherReport.temp_max - 273.15) * 9 / 5 + 32;
              scope.weather.list[weatherReportIndex].activity.tempConversionMin = (weatherReport.temp_min - 273.15) * 9 / 5 + 32;
              scope.weather.list[weatherReportIndex].activity.tempConversion = (weatherReport.temp - 273.15) * 9 / 5 + 32;
              scope.weather.list[weatherReportIndex].activity.tempUnit = 'F';
          }
          //initializes the changeTemp() function
          scope.changeTemp= function() {

            if (celcius === false) {
              celcius = true;
            }
            else {
              celcius = false;
            }
            //changing data to the right values based on C or F, sends data to new attributes in json string
            for(var weatherReportIndex in scope.weather.list) {
              weatherReport = scope.weather.list[weatherReportIndex].activity;
              if(celcius === true) {
                scope.weather.list[weatherReportIndex].activity.tempConversionMax = weatherReport.temp_max - 273.15;
                scope.weather.list[weatherReportIndex].activity.tempConversionMin = weatherReport.temp_min - 273.15;
                scope.weather.list[weatherReportIndex].activity.tempConversion = weatherReport.temp - 273.15;
                scope.weather.list[weatherReportIndex].activity.tempUnit = 'C';
              }
              else if(celcius !== true) {
                scope.weather.list[weatherReportIndex].activity.tempConversionMax = (weatherReport.temp_max - 273.15) * 9 / 5 + 32;
                scope.weather.list[weatherReportIndex].activity.tempConversionMin = (weatherReport.temp_min - 273.15) * 9 / 5 + 32;
                scope.weather.list[weatherReportIndex].activity.tempConversion = (weatherReport.temp - 273.15) * 9 / 5 + 32;
                scope.weather.list[weatherReportIndex].activity.tempUnit = 'F';
              }
            }
          };
        });
      }
    };
  });





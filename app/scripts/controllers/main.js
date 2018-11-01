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

app.service('weatherAPICall', function ($http){
  var weather = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast?zip=95616,us&APPID=da933024abf8328d2a00837bc272b811'
      }).then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        var allWeather = {list: []};
        for (let weatherReport in response.data.list) {
          if (response.data.list.hasOwnProperty(weatherReport)) {
            allWeather.list.push(format(response.data.list[weatherReport], response.data));
          }
        }
        //console.log(allWeather.list);
        return allWeather;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return weather;

});


app.controller('PhoneListController', function PhoneListController($scope, weatherAPICall) {

  $scope.weather = []
  $scope.servicePromise = weatherAPICall.async();
});

app.directive('ngWeather',
  function() {
    return {
      templateUrl: 'views/phoneList.html',
      restrict: 'EA',
      controller: 'PhoneListController',
      link: function(scope, elem, attr) {
        scope.servicePromise.then(function (data) {
          scope.weather = data;
          var celcius = false;
          var weatherReport;

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
            console.log(weatherReport);
          }

          scope.changeTemp= function() {

            if (celcius === false) {
              celcius = true;
            }
            else {
              celcius = false;
            }
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
              console.log(weatherReport);
            }
          };
        });
      }
    };
  });





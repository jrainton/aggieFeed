'use strict';

function format(weatherReport, mainFormat) {
  console.log(weatherReport);
  let dateString = new Date(weatherReport.dt_txt);
  dateString.setHours(dateString.getHours() - 7);
  let dateTime = dateString.toTimeString().split(' ')[0];
  var activity =
    {
      'activity': {
        'pressure': weatherReport.main.pressure,
        'temp': weatherReport.main.temp,
        'temp_min': weatherReport.main.temp_min,
        'temp_max': weatherReport.main.temp_max,
        'humidity': weatherReport.main.humidity,
        'weather': weatherReport.weather[0].main,
        'weather_desc': weatherReport.weather[0].description,
        'wind_speed': weatherReport.wind.speed,
        'icon': 'icon-tint',
        'actor': {
          'id': weatherReport.dt || 'department identifier',
          'objectType': 'person',
          'displayName': 'Weather',
          'author': {
            'id': weatherReport.dt || 'kName',
            'displayName': 'FirstName LastName'
          },
        },
        'verb': 'post',
        'title': dateString.toDateString() + ' @ ' + dateTime || 'Test Event',
        'object': {
          'ucdSrcId': weatherReport.dt || 'content identifier',
          'objectType': 'notification',
          'content': 'Weather Report',
          'contentImage': {
            'source': 'aggiefeed',
            'dimensions': {
              'normal': {
                'url': '/content/uploads-normal/someId.jpg',
                'width': 400,
                'height': 280
              },
              'high': {
                'url': '/content/uploads-hight/someId.jpg',
                'width': 650,
                'height': 460
              }
            },
            'ucdEdusModel': {
              'url': 'http://ucdavis.edu',
              'urlDisplayName': 'UC Davis',
              'event': {
                'location': 'Event Location',
                'hasStartTime': true,
                'startDate': '2013-07-01T17:00:00.000Z',
                'endDate': '2013-07-01T17:00:00.000Z',
                'isAllDay': false,
                'iCalendar': 'iCal string',
                'addToGoogleCalendar': 'string'
              }
            },
            'location': {
              'displayName': mainFormat.city.name || 'Mount Everest',
              'geo': {
                'latitude': mainFormat.city.coord.lat || '27.9881',
                'longitude': mainFormat.city.coord.lon ||'86.9253'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [mainFormat.city.coord.lon,mainFormat.city.coord.lat] || [86.9253, 27.9881]
              }
            }
          },
          'to': [
            {
              'id': 'jrainton',
              'g': false,
              'i': false
            }
          ],
          'ucdEdusMeta': {
            'labels': ['~academic', 'some-label'],
            'startDate': '2013-07-01T17:00:00.000Z',
            'endDate': '2013-07-01T17:00:00.000Z'
          }
        }
      }
    };
  return activity;
}

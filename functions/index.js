const functions = require('firebase-functions');
const PrayerTimeUtils = require('./prayertimeutils');
const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const wc = require('which-country');
const timezoner = require('timezoner');
const moment = require('moment-timezone');

exports.salattimes = functions.https.onRequest((req, res) => {
    const app = new ActionsSdkApp({request: req, response: res});

    const mainIntent = function(app){
        let coordinates = {latitude: 48.856638, longitude: 2.352241}
        let country = wc([coordinates.longitude, coordinates.latitude]);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();


        let ptu = new PrayerTimeUtils(yyyy, mm, dd, coordinates.latitude, coordinates.longitude, 0, 0);
        ptu.changeCountry(country);

        timestampFajr = ptu.getFajrTimestamp();
        timestampSunrise = ptu.getSunriseTimestamp();
        timestampDhuhr = ptu.getDhuhrTimestamp();
        timestampAsr = ptu.getAsrTimestamp();
        timestampMaghrib = ptu.getMaghribTimestamp();
        timestampIsha = ptu.getIshaTimestamp();

        timezoner.getTimeZone(
    		coordinates.latitude, // Latitude coordinate
    		coordinates.longitude, // Longitude coordinate
    		function (err, data) {
                let timezone = null;
    			if (err) {
    				timezone = null;
    			} else {
    				timezone = data.timeZoneId;
    			}
                fajrTime = moment(timestampFajr).format('hh:mma');
                sunriseTime = moment(timestampSunrise).format('hh:mma');
                dhuhrTime = moment(timestampDhuhr).format('hh:mma');
                asrTime = moment(timestampAsr).format('hh:mma');
                maghribTime = moment(timestampMaghrib).format('hh:mma');
                ishaTime = moment(timestampIsha).format('hh:mma');

                if(timezone != null){
                    fajrTime = moment(timestampFajr).tz(timezone).format('hh:mma');
                    sunriseTime = moment(timestampSunrise).tz(timezone).format('hh:mma');
                    dhuhrTime = moment(timestampDhuhr).tz(timezone).format('hh:mma');
                    asrTime = moment(timestampAsr).tz(timezone).format('hh:mma');
                    maghribTime = moment(timestampMaghrib).tz(timezone).format('hh:mma');
                    ishaTime = moment(timestampIsha).tz(timezone).format('hh:mma');
                }

                let speech = "<speak>"+
                "<s>Today, fajr is at <say-as interpret-as=\"time\" format=\"hms12\">"+fajrTime+"</say-as></s>"+
                "<s>Sunrise is at <say-as interpret-as=\"time\" format=\"hms12\">"+sunriseTime+"</say-as></s>"+
                "<s>Dhuhr is at <say-as interpret-as=\"time\" format=\"hms12\">"+dhuhrTime+"</say-as></s>"+
                "<s>Asr is at <say-as interpret-as=\"time\" format=\"hms12\">"+asrTime+"</say-as></s>"+
                "<s>Maghrib is at <say-as interpret-as=\"time\" format=\"hms12\">"+maghribTime+"</say-as></s>"+
                "<s>Isha is at <say-as interpret-as=\"time\" format=\"hms12\">"+ishaTime+"</say-as></s>"+
                "</speak>";

                app.tell(speech);
    		}
    	);
    }

    let actionMap = new Map();
    actionMap.set(app.StandardIntents.MAIN, mainIntent);
    app.handleRequest(actionMap);
});

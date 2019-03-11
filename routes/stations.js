const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

const stations = require('../data/stations').stations;



/* GET users listing. */
router.get('/', function(req, res, next) {
	var getStationData = async () => {
		let results = {};
		results.stations = [];
		results.errors = [];
		// const regex = /[A-Z]{4}-[A-Z]{2}/g;
		
		for (var i = 0; i < stations.length; i++) {
			console.log("Attempting to fetch data from", stations[i]);
			await axios.get(stations[i])
			.then(function(response) {
				for (let i = 0; i < response.data.length; i++) {
					if (response.data[i].StreamIndex >= 0) {
						let result = {};
						result.calls = response.config.url.match(/[A-Z]{4}-[A-Z]{2}[0-9]?/g);
						result.stationId = response.data[i].StationID;
						result.timestamp = moment.unix(response.data[i].Stamp).format('MM-DD-YYYY, HH:mm:ss');
						result.artist = response.data[i].Artist;
						result.title = response.data[i].Title;
						result.image = response.data[i].Meta[1].Image200;
						results.stations.push(result);
						break;
					}
				}
			})
			.catch(function(error) {
				console.log("An error occured when fetching data from ", stations[i])
				results.errors.push(stations[i]);
			})
		}
		return results;
	};
	
	var getAllStations = async () => {
		var stationData = await getStationData();
		res.render('stations', { stations: stationData.stations, errors: stationData.errors, title: "Station Status", showErrors: false });
	}
	getAllStations();
});
module.exports = router;
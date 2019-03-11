const express = require('express');
const router = express.Router();

// data imports, arrays of station URLs for axios calls
const entercom = require('../data/entercomStations').stations;
const cox = require('../data/coxStations').stations;

// helper function to find current event and parse station data once retrieved
const getStationData = require('../lib/getStationData').getStationData;

/* GET stations listing. */
router.get('/entercom', function(req, res, next) {
	const getAllStations = async () => {
		var stationData = await getStationData(entercom);
		res.render('stations', { stations: stationData.stations, errors: stationData.errors, title: "Station Status"});
	}
	getAllStations();
});

router.get('/cox', function(req, res, next) {
	const getAllStations = async () => {
		var stationData = await getStationData(cox);
		res.render('stations', { stations: stationData.stations, errors: stationData.errors, title: "Station Status"});
	}
	getAllStations();
})
module.exports = router;
var express = require('express');
var router = express.Router();
var axios = require('axios');

var stations = require('../data/stations').stations;



/* GET users listing. */
router.get('/', function(req, res, next) {
	var getStationData = async () => {
		let results = {};
		results.stations = [];
		results.errors = [];
		
		for (var i = 0; i < stations.length; i++) {
			console.log("Attempting to fetch data from ", stations[i]);
			await axios.get(stations[i])
			.then(function(response) {
				for (let i = 0; i < response.data.length; i++) {
					if (response.data[i].StreamIndex > 0) {
						let result = {};
						result.stationId = response.data[i].StationID;
						result.timestamp = response.data[i].Stamp;
						result.artist = response.data[i].Artist;
						result.title = response.data[i].Title;
						result.image = response.data[i].Meta[1].Image200;
						// console.log(result)
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
		res.render('stations', { stations: stationData.stations, errors: stationData.errors, title: "Station Status" });
	}
	getAllStations();
});
module.exports = router;


// let promisesArr = stations.map(url => axios.get(url));











// var parsedStations = [
// 	{
// 		stationId : "asdf1234",
// 		timestamp : "12345678",
// 		artist : "joe biden",
// 		title : "baracks my buddy",
// 		img : "http://image.url"
// 	}
// ]
// function getStationData() {
	// 	let results = [];
	// 	stations.forEach(function(station) {
	// 		console.log("Attemption to fetch data from ", station);
	// 		axios.get(station)
	// 		.then(function(response) {
	// 			for (let i = 0; i < response.data.length; i++) {
	// 				if (response.data[i].StreamIndex > 0) {
	// 					let result = {};
	// 					result.stationId = response.data[i].StationID;
	// 					result.timestamp = response.data[i].Stamp;
	// 					result.artist = response.data[i].Artist;
	// 					result.title = response.data[i].Title;
	// 					result.image = response.data[i].Meta[1].Image200;
	// 					results.push(result);
	// 					break;
	// 				}
	// 			}
	// 			return results;	
	// 		})
	// 		.catch(function(error) {
	// 			console.log("An error occured when fetching data from ", station)
	// 		})
	// 	})
	// };

	// res.render('stations', { stations: getStationData(), title: "Station Status" });
	


	// fetch data from jump2go JSON files
	// const getStations = () => {
	// 	let results = [];
	// 	stations.forEach(function(station) {
	// 		console.log("Attemption to fetch data from ", station);
	// 		axios.get(station)
	// 		.then(function(response) {
	// 			for (let i = 0; i < response.data.length; i++) {
	// 				if (response.data[i].StreamIndex > 0) {
	// 					let result = {};
	// 					result.stationId = response.data[i].StationID;
	// 					result.timestamp = response.data[i].Stamp;
	// 					result.artist = response.data[i].Artist;
	// 					result.title = response.data[i].Title;
	// 					result.image = response.data[i].Meta[1].Image200;
	// 					results.push(result);
	// 					break;
	// 				}
	// 			}
	// 		})
	// 		.catch(function(error) {
	// 			console.log("An error occured when fetching data from ", station)
	// 		})
	// 		// .then(function(response) {
	// 		// 	console.log(response.data.StationID);
	// 		// })
	// 		// .catch(function(error) {
	// 		// 	console.log("Data retrieval failed.")
	// 		// 	console.log("Status code: ", error.response.status);
	// 		// 	res.render('error', {message: "an error has occured", error: error})
	// 		// })
	// 	});
	// 	console.log(results)
	// 	res.render('stations', { stations: results, title: "Station Status" });
	// 	// This works for one station at a time
	// 	// axios.get(stations[2])
	// 	// 	.then(function(response) {
	// 	// 		console.log("Fetching data from ActiveData.")
	// 	// 		console.log("Response: ", response.status)
	// 	// 		if (response.status === 200) {
	// 	// 			for (let i = 0; i < response.data.length; i++) {
	// 	// 				if (response.data[i].StreamIndex > 0) {
	// 	// 					let result = {};
	// 	// 					result.stationId = response.data[i].StationID;
	// 	// 					result.timestamp = response.data[i].Stamp;
	// 	// 					result.artist = response.data[i].Artist;
	// 	// 					result.title = response.data[i].Title;
	// 	// 					result.image = response.data[i].Meta[1].Image200;
	// 	// 					results.push(result);
	// 	// 					break;
	// 	// 				}
	// 	// 			}
	// 	// 		}
	// 	// 		res.render('stations', { stations: results, title: "Station Status" });
	// 	// 	} 
	// 	// )
	// 	// .catch(function(error) {
	// 	// 	console.log("Data retrieval failed.")
	// 	// 	console.log("Status code: ", error.response.status);
	// 	// 	console.log(error.response)
	// 	// 	res.render('error', {message: "an error has occured", error: error})
	// 	// })
	// };
	// getStations();

	//  };


	// var fetchStationData = (cb) => {
	// 	let results = [];
	// 	for (let i = 0; i < stations.length; i++) {
	// 		axios
	// 			.get(stations[i])
	// 			.then(result => {
	// 				if (result.status === 200) {
	// 					console.log("Station lookup successful, code:", result.status)
	// 					for (let i = 0; i < result.data.length; i++) {
	// 						if (result.data[i].StreamIndex >= 0) {
	// 							let currentEvent = {};
	// 							currentEvent.stationId = result.data[i].StationID;
	// 							currentEvent.timestamp = result.data[i].Stamp;
	// 							currentEvent.artist = result.data[i].Artist;
	// 							currentEvent.title = result.data[i].Title;
	// 							currentEvent.img = result.data[i].Meta[1].Image200;
	// 							results.push(currentEvent);
	// 							break;
	// 						}
	// 					}
	// 				}
	// 			})
	// 			.catch(err => {
	// 				console.log("Error occured when retrieving data from: ", stations[i]);
	// 			})
	// 		}
	// 	cb();	
	// };

	// var testFunc = () => {
	// 	let myResults = fetchStationData();
	// };

	// fetchStationData(testFunc)

	// var getStation = (url, destination) => {
	// 	axios.get(url)
	// 	.then((response) => {
	// 		if (response.status === 200) {
	// 			for (let i = 0; i < response.data.length; i++) {
	// 				if (response.data[i].StreamIndex > 0) {
	// 					let result = {};
	// 					result.stationId = response.data[i].StationID;
	// 					result.timestamp = response.data[i].Stamp;
	// 					result.artist = response.data[i].Artist;
	// 					result.title = response.data[i].Title;
	// 					result.image = response.data[i].Meta[1].Image200;
	// 					destination.push(result);
	// 					// console.log(results)
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log("Error occured")
	// 	});
	// };


	// var getStationData = () => {
	// 	var results = []
	// 	stations.forEach((station) => {
	// 		getStation(station, results);
	// 	});
	// 	return results;
	// };

	// getStationData().then(data => {
	// 	res.render('stations', { stations: data, title: "Station Status" });
	// });



	// const fetchStationData = () => {
	// 	let results = [];
	// 	stations.forEach((station, idx) => {
	// 		axios
	// 			.get(station)
	// 			.then(result => {
	// 				if (result.status === 200) {
	// 					console.log("Station lookup successful, code:", result.status)
	// 					for (let i = 0; i < result.data.length; i++) {
	// 						if (result.data[i].StreamIndex >= 0) {
	// 							let currentEvent = {};
	// 							currentEvent.stationId = result.data[i].StationID;
	// 							currentEvent.timestamp = result.data[i].Stamp;
	// 							currentEvent.artist = result.data[i].Artist;
	// 							currentEvent.title = result.data[i].Title;
	// 							currentEvent.img = result.data[i].Meta[1].Image200;
	// 							results.push(currentEvent);
	// 							break;
	// 						}
	// 					}
	// 				}
	// 			})
	// 			.catch(err => {
	// 				if (err) {
	// 					console.log("Error occured when retrieving data from: ", station);
	// 					// console.log(err)
	// 				}
	// 			})
	// 	})
	// 	return results;
	// }
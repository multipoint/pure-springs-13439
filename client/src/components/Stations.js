import React, { Component } from 'react';

import Station from './Station';

class Stations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfStations: 0,
			isLoaded: false,
			stations: [],
			error: null
		}
	}

	componentDidMount() {
		console.log("MOUNTY")
		fetch("http://localhost:5000/stations/test")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result.stations);
					this.setState({
						isLoaded: true,
						stations: result.stations
					})
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					})
				}
			)
	}

  render() {
		return (
			<div>
			<header className="App-header">
				<p>
				Station Status
				</p>
			</header>
			</div>
		);
  }
}

export default Stations;
import React, { Component } from 'react';
import './App.css';

import Stations from './components/Stations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stations />
      </div>
    );
  }
}

export default App;

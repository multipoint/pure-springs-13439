import React, { Component } from 'react';

class Station extends Component {
  render() {
    return (
      <div className="Station">
        <p>This is a test station!</p>
        <p>This station is named {this.props.calls}</p>
      </div>
    );
  }
}

export default Station;
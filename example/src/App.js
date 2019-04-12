import React, { Component } from 'react';
import './App.css';
import TimingComponent from "./TimingComponent"

import withTimer from "react-timer-connector"

const TimingCom = withTimer(TimingComponent)

class App extends Component {
  render() {
    return (
      <div className="App" style={{
        marginTop: 120
      }}>
        <TimingCom/>
      </div>
    );
  }
}

export default App;

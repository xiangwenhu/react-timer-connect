import React, { Component } from "react";
import "./App.css";
import TimingComponent from "./TimingComponent";

import withTimer from "./time";

const TimingCom = withTimer(TimingComponent, {
  interval: 100,
  start:30,
  end:10
});

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          marginTop: 120
        }}
      >
        <TimingCom />
      </div>
    );
  }
}

export default App;

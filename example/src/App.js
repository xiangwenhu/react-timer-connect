import React, { Component } from "react";
import "./App.css";
import TimingComponent from "./TimingComponent";

// import withTimer from "react-time-hoc";
import withTimer from "./time";

const TimingCom = withTimer(TimingComponent, {
    interval: 100,
    start: 30,
    end: 0
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
                <TimingCom onTimingEnd={() => alert("ended")} />
            </div>
        );
    }
}

export default App;

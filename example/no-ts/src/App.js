import React, { Component } from "react";
import "./App.css";
import TimingComponent from "./TimingComponent";

//import withTimer from "react-time-hoc";
import withTimer from "./time";

const TimingCom = withTimer(TimingComponent, {
    interval: 50,
    start: 60,
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
                <TimingCom />
            </div>
        );
    }
}

export default App;

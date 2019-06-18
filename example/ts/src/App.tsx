import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TimingComponent from "./TimingComponent";
import withTimer from "react-time-hoc";

const TimingCom = withTimer(TimingComponent, {
    interval: 100,
    start: 30,
    end: 0
});

const App: React.FC = () => {
    return (
        <div className="App">
            <TimingCom like={0} />
        </div>
    );
};

export default App;

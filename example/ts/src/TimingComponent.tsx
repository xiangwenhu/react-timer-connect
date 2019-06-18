import React from "react";
import { ITimerProps } from "react-time-hoc";

interface IProps {
    like: number
};

export default class TimingComponent extends React.Component<ITimerProps & IProps, any> {
    componentDidMount() {
        const { timer } = this.props;
        if (timer) {
            timer.start();
        }
    }

    render() {
        const { value, isTiming } = this.props.timer;
        return (
            <div>
                <p>计时：{value}</p>
                <p>isTiming: {isTiming + ""}</p>
                <input type="button" value="停止" onClick={() => this.props.timer.cancel()} />
                <input type="button" value="继续" onClick={() => this.props.timer.continue()} />
                <input type="button" value="重置" onClick={() => this.props.timer.reset()} />
                <input type="button" value="重置并继续" onClick={() => this.props.timer.reset(true)} />
            </div>
        );
    }
}

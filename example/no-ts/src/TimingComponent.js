import React from "react";

export default class TimingComponent extends React.Component {
    state = {
        isGetting: false
    };

    componentDidMount() {
        const { timer } = this.props;
        if (timer) {
            // timer.start();
        }
    }
    onGetCode = () => {
        this.setState({ isGetting: true });
        setTimeout(() => {
            this.props.timer.start();
            this.setState({
                isGetting: false
            });
        }, 1500);
    };

    render() {
        const { value, isTiming } = this.props.timer;
        const { isGetting } = this.state;

        const valueText = isGetting ? "获取中" : isTiming ? "剩余时间" + value + "s" : "获取验证码";

        return (
            <div>
                <p>计时：{value}</p>
                <p>isTiming: {isTiming + ""}</p>

                <input disabled={isTiming || isGetting ? true : false} type="button" value={valueText} onClick={this.onGetCode} />
                <br />
                <input type="button" value="开始" onClick={() => this.props.timer.start()} />
                <input type="button" value="停止" onClick={() => this.props.timer.cancel()} />
                <input type="button" value="继续" onClick={() => this.props.timer.continue()} />
                <input type="button" value="重置" onClick={() => this.props.timer.reset()} />
                <input type="button" value="重置并继续" onClick={() => this.props.timer.reset(true)} />
            </div>
        );
    }
}

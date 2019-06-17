import React from "react";
import timeout from "etimeout";

const defaultOptions = {
    interval: 1000,
    start: 60,
    step: -1,
    end: 0
};

const withTimer = (Component, initialOptions = defaultOptions) => {
    return class TimerComponent extends React.Component {
        constructor(props) {
            super(props);
            this.options = Object.assign({}, defaultOptions, initialOptions);
            this.timer = timeout(this.options.interval, null);
            this.state = {
                value: this.options.start,
                isTiming: false
            };
        }

        componentWillUnmount() {
            this.timer && this.timer.cancel();
            this.timer = null;
        }

        judge = value => {
            const options = this.options;
            return (options.step <= 0 && options.end >= value) || (options.step > 0 && options.end <= value);
        };

        end = () => {
            const { onTimingEnd } = this.props;
            this.timer.cancel();
            this.setState(
                {
                    isTiming: false
                },
                () => {
                    onTimingEnd && onTimingEnd();
                }
            );
        };

        isEnded = () => {
            const ended = this.judge(this.state.value);
            if (ended) {
                this.end();
            }
            return ended;
        };

        nextPeriod = next => {
            if (this.isEnded()) {
                return;
            }
            const options = this.options;
            this.setState(
                preState => {
                    return {
                        value: preState.value + options.step
                    };
                },
                () => {
                    if (this.isEnded()) {
                        return;
                    }
                    next();
                }
            );
        };

        start = (opt = {}) => {
            this.options = Object.assign({}, defaultOptions, initialOptions, opt);
            const ended = this.judge(this.state.value);
            if (!ended) {
                this.setState({ isTiming: true });
                this.timer.start(this.nextPeriod);
            }
        };

        reset = autoStart => {
            this.timer.cancel();
            const options = this.options;
            this.setState(
                {
                    isTiming: false,
                    value: options.start
                },
                () => {
                    if (autoStart === true) {
                        this.start();
                    }
                }
            );
        };

        cancel = () => {
            this.setState({
                isTiming: false
            });
            this.timer.cancel();
        };

        continue = () => {
            const ended = this.judge(this.state.value);
            if (ended) {
                return;
            }
            this.setState({
                isTiming: true
            });
            this.timer.continue();
        };

        getTimer() {
            return {
                isTiming: this.state.isTiming,
                value: this.state.value,
                start: this.start,
                cancel: this.cancel,
                continue: this.continue,
                reset: this.reset
            };
        }

        render() {
            const timer = this.getTimer();
            return <Component timer={timer} {...this.pops} />;
        }
    };
};

export default withTimer;

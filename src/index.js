import React from "react";
import timeout from "etimeout";

const defaultOptions = {
  interval: 1000,
  start: 60,
  step: -1,
  end: 0
};

const withTimer = (Component, options = defaultOptions) => {
  return class TimerComponent extends React.Component {
    constructor(props) {
      super(props);
      this.timer = timeout(options.interval, null);
      this.options = Object.assign({}, defaultOptions, options);
      this.state = {
        value: options.start,
        isTiming: false
      };

      this.judge = this.judge.bind(this);
      this.nextPeriod = this.nextPeriod.bind(this);
      this.start = this.start.bind(this);
      this.reset = this.reset.bind(this);
      this.cancel = this.cancel.bind(this);
      this.continue = this.continue.bind(this);
      
    }

    componentWillUnmount() {
      this.timer && this.timer.cancel();
      this.timer = null;
    }

    judge(value) {
      const options = this.options;
      return (
        (options.step <= 0 && options.end >= value) ||
        (options.step > 0 && options.end <= value)
      );
    }

    nextPeriod(next) {
      const ended = this.judge(this.state.value);
      if (ended) {
        this.timer.cancel();
        this.setState({
          isTiming: false
        });
        return;
      }
      this.setState(
        preState => {
          return {
            value: preState.value + options.step
          };
        },
        () => {
          next();
        }
      );
    }

    start(opt = {}) {
      this.options = Object.assign({}, defaultOptions, options, opt);
      const ended = this.judge(this.state.value);
      if (!ended) {
        this.setState({ isTiming: true });
        this.timer.start(this.nextPeriod);
      }
    }

    reset(autoStart) {
      this.timer.cancel();
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
    }

    cancel() {
      this.setState({
        isTiming: false
      });
      this.timer.cancel();
    }

    continue() {
      const ended = this.judge(this.state.value);
      if (ended) {
        return;
      }
      this.setState({
        isTiming: true
      });
      this.timer.continue();
    }

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

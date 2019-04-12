react-time-hoc
=============
暴露一个创建高阶组件的函数，该函数返回的组件会添加上timer属性。  
最典型的的应用场景就是手机验证码。
```js
import withTimer from "react-time-hoc"
const LoginTimerComponent = withTimer (LoginComponent, options)

```  
options有如下属性：
* `interval`   
  计时间隔，默认1000ms
* `start`   
  初始值，默认值60
* `step`   
  步距, 默认值 -1
* `end`  
目标值，默认值0


timer属性有如下属性：
* `isTiming: boolean `   
    是否在计时
* `value: number `   
  当前的值，数组
* `start(option)`  
  开始计时
* `cancel()`    
  暂停/取消计时
* `continue()`   
  继续计时
* `reset(autoStart?:boolean)`  
  重置


## 安装

```
npm install react-time-hoc
```

## 使用
```js
import withTimer from "react-time-hoc"
import LoginComponent from "./LoginComponent"

const LoginTimerComponent = withTimer (LoginComponent, options)
```

## 示例

App.js
```js
import React, { Component } from 'react';
import './App.css';
import TimingComponent from "./TimingComponent"

import withTimer from "react-time-hoc"

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

```

TimingComponent.js
```js
import React from "react";

export default class TimingComponent extends React.Component {
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
        <p>isTiming: {isTiming + ''}</p>
        <input
          type="button"
          value="停止"
          onClick={() => this.props.timer.cancel()}
        />
        <input
          type="button"
          value="继续"
          onClick={() => this.props.timer.continue()}
        />
        <input
          type="button"
          value="重置"
          onClick={() => this.props.timer.reset()}
        />
        <input
          type="button"
          value="重置并继续"
          onClick={() => this.props.timer.reset(true)}
        />
      </div>
    );
  }
}

```

![示例图](/docs/s.jpg)
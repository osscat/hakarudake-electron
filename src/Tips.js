import React, { Component } from 'react';
import avatar from './jeff.png'

export default class Tips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.getMessage(this.props.dataCount)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataCount !== prevProps.dataCount) {
      this.setState({
        message: this.getMessage(this.props.dataCount)
      });
    }
  }

  getMessage(dataCount) {
    const message = {
      header: '',
      description1: '',
      description2: ''
    }
    if (dataCount < 7) {
      message.header = '体重の変化を知ろう！';
      message.description1 = 'まずは数日間、朝晩に体重を測って記録していましょう。';
      message.description2 = '思ったより日々変化していることに気づくかも!?';  
    }
    if (10 < dataCount && dataCount < 15) {
      message.header = '変化を起こしてみよう！';
      message.description1 = '少し運動してみたり、食事を少し変えてみて体重が変化するか見てみましょう。';
      message.description2 = 'いきなり頑張ろうとするのではなくて、少しずつがポイントですヨ。';
    }
    if (60 < dataCount && dataCount < 65) {
      message.header = 'おめでとうございます！';
      message.description1 = '計測開始から1か月が経ちましたね。自分の体に変化は見られましたか？';
      message.description2 = 'じわじわ減っているとよい傾向です。今後も続けていきましょう。';
    }
    return message;
  }

  render() {
    return (
      <div className="tips">
        {this.state.message.header &&
          <div className="ui card">
            <div className="content">
              <div className="header">{this.state.message.header}</div>
              <div className="description">{this.state.message.description1}</div>
              <div className="description">{this.state.message.description2}</div>
            </div>
            <div className="extra content">
              <div className="right floated author">
                <img className="ui avatar image" src={avatar} alt="" /> Jeff
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
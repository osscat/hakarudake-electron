import React, { Component } from 'react';

export default class AddRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '2019-02-06', weight: '64.9'};

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(event) {
    this.setState({date: event.target.value});
  }

  handleWeightChange(event) {
    this.setState({weight: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit({
      date: this.state.date,
      weight: this.state.weight
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="date" value={this.state.date} onChange={this.handleDateChange} />
        <input type="text" value={this.state.weight} onChange={this.handleWeightChange} />Kg
        <input type="submit" value="追加"/>
      </form>
    );
  }
}
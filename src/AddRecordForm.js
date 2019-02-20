import React, { Component } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';

export default class AddRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '2019-02-06', weight: '64.9'};

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.addRecord = this.addRecord.bind(this);
  }

  handleDateChange(event) {
    this.setState({date: event.target.value});
  }

  handleWeightChange(event) {
    this.setState({weight: event.target.value});
  }

  addRecord() {
    this.props.onSubmit({
      date: this.state.date,
      weight: this.state.weight
    })
  }

  render() {
    const options = [
      { key: '朝', text: '朝', value: '朝' },
      { key: '夜', text: '夜', value: '夜' },
    ]
    
    return (
      <div className="add-record-form">
        新しい記録：
        <Input
          type="date"
          className="date-input"
          label={<Dropdown defaultValue='朝' options={options} />}
          labelPosition='right'
          value={this.state.date}
          onChange={this.handleDateChange}
          />
        <Input
          type="number"
          className="weight-input"
          label={{ basic: true, content: 'kg' }}
          labelPosition='right'
          placeholder='体重'
          step="0.1"
          value={this.state.weight} 
          onChange={this.handleWeightChange}
        />
        <Button
          color="orange"
          content='追加'
          size="huge"
          onClick={this.addRecord}
        />
      </div>
    );
  }
}
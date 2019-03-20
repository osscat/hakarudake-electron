import moment from 'moment';
import React, { Component } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { TIME_OPTIONS } from './AppConst';

export default class AddRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      hour: '7',
      weight: ''
    };
  }

  onChange = (event, data) => {
    const name = data.name || 'hour';
    this.setState({
      [name]: data.value
    });
  }

  addRecord = () => {
    this.props.onSubmit({
      date: moment(this.state.date).set('hour', this.state.hour),
      weight: this.state.weight
    });
  }

  render() {
    return (
      <div className="add-record-form">
        新しい記録：
        <Input
          name="date" type="date"
          className="date-input"
          label={
            <Dropdown
              options={TIME_OPTIONS}
              value={this.state.hour}
              onChange={this.onChange}
            />}
          labelPosition='right'
          value={this.state.date}
          onChange={this.onChange}
        />
        <Input
          name="weight" type="number"
          className="weight-input"
          label={{ basic: true, content: 'kg' }}
          labelPosition='right'
          placeholder='体重'
          step="0.1"
          value={this.state.weight} 
          onChange={this.onChange}
        />
        <Button
          color="orange"
          content='追加'
          size="huge"
          disabled={!this.state.date||!this.state.weight}
          onClick={this.addRecord}
        />
      </div>
    );
  }
}
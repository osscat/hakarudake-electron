import moment from 'moment';
import React, { Component } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';

export default class AddRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        date: moment().format('YYYY-MM-DD'), 
        weight: '64.9'  
      }
    };
  }

  onChange = (event) => {
    const record = this.state.record;
    record[event.target.name] = event.target.value;
    this.setState({
      record: record
    });
  }

  addRecord = () => {
    this.props.onSubmit(this.state.record);
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
          name="date"
          className="date-input"
          label={<Dropdown defaultValue='朝' options={options} />}
          labelPosition='right'
          value={this.state.record.date}
          onChange={this.onChange}
          />
        <Input
          type="number"
          name="weight"
          className="weight-input"
          label={{ basic: true, content: 'kg' }}
          labelPosition='right'
          placeholder='体重'
          step="0.1"
          value={this.state.record.weight} 
          onChange={this.onChange}
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
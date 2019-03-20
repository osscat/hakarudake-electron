import moment from 'moment';
import React, { Component } from 'react';
import { Form, Button, Dropdown, Input } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
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
      <Form className="add-record-form">
        <Form.Group inline>
          新しい記録：
          <DateInput
            name="date"
            className="date-input"
            dateFormat="YYYY-MM-DD"
            popupPosition="bottom center"
            icon={false}
            value={this.state.date}
            onChange={this.onChange}
          />
          <Form.Field>
            <Dropdown
              className="hour-input huge"
              compact
              selection
              options={TIME_OPTIONS}
              value={this.state.hour}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
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
          </Form.Field>
          <Button
            color="orange"
            content='追加'
            size="huge"
            disabled={!this.state.weight}
            onClick={this.addRecord}
          />
        </Form.Group>
      </Form>
    );
  }
}
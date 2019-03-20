import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Segment, Button, Dropdown, Form, Input, TextArea } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { TIME_OPTIONS } from './AppConst';

export default class EditRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.record, prevProps.record)) {
      const record = _.clone(this.props.record);
      if (record) {
        // 日付と時刻に分解
        const datetime = record.date;
        record.date = moment(datetime).format('YYYY-MM-DD');
        record.hour = moment(datetime).format('H');
      }
      this.setState({
        record: record
      });
    }
  }

  onChange = (event, data) => {
    const record = this.state.record;
    const name = data.name || 'hour';
    record[name] = data.value;
    this.setState({
      record: record
    });
  }

  editRecord = () => {
    // 分解していた日付と時刻を統合
    const record = this.state.record;
    record.date = moment(record.date).set('hour', record.hour);
    delete record.hour;

    this.props.onSubmit(record);
    this.setState({
      record: null
    });    
  }

  render() {
    const isEmpty = !this.state.record; 
    
    return (
      <div className="edit-record-form">
        <Segment>
          {isEmpty &&
            <p>グラフ上の点をクリックすると編集できます</p>
          }
          {!isEmpty &&
            <div>
              <p>記録を編集</p>
              <Form>
                <DateInput
                  name="date"
                  className="date-input"
                  dateFormat="YYYY-MM-DD"
                  popupPosition="bottom center"
                  icon={false}
                  value={this.state.record.date}
                  onChange={this.onChange}
                />
                <Form.Field>
                  <Dropdown
                    className="hour-input huge"
                    compact
                    selection
                    options={TIME_OPTIONS}
                    value={this.state.record.hour}
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
                    value={this.state.record.weight} 
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <TextArea
                    name="memo"
                    placeholder='言い訳とか'
                    value={this.state.record.memo||''} 
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Button
                  color="yellow"
                  content='保存'
                  size="medium"
                  onClick={this.editRecord}
                />
              </Form>
            </div>
          }
        </Segment>
      </div>
    );
  }
}
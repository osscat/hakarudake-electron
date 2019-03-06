import _ from 'lodash';
import React, { Component } from 'react';
import { Segment, Button, Dropdown, Input } from 'semantic-ui-react';

export default class EditRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.record, prevProps.record)) {
      this.setState({
        record: _.clone(this.props.record)
      });
    }
  }

  onChange = (event) => {
    const record = this.state.record;
    record[event.target.name] = event.target.value;
    this.setState({
      record: record
    });
  }

  editRecord = () => {
    this.props.onSubmit(this.state.record);
  }

  render() {
    const options = [
      { key: '朝', text: '朝', value: '朝' },
      { key: '夜', text: '夜', value: '夜' },
    ]
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
                content='保存'
                size="medium"
                onClick={this.editRecord}
              />
            </div>
          }
        </Segment>
      </div>
    );
  }
}
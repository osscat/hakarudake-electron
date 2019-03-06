import _ from 'lodash';
import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import AddRecordForm from './AddRecordForm';
import HistoryChart from './HistoryChart';
import './App.css';

class App extends Component {
  static dataKey = "hakarudake-data";

  constructor(props) {
    super(props);

    let savedData = localStorage.getItem(App.dataKey);
    savedData = savedData ? JSON.parse(savedData) : [];
    this.state = {
      data: savedData
    };
  }

  statusLabel() {
    if (this.state.data.length) {
      return _.sortBy(this.state.data, 'date')[0].date + 'から開始'
    } else {
      return '未開始'
    }
  }

  addRecords(records) {
    const added = records.map(record => _.merge({
      style: 'circle',
      radius: 3
    }, record));
    const newData = this.state.data.concat(added);

    this.setState({
      data: newData
    });
    localStorage.setItem(App.dataKey, JSON.stringify(newData));
  }

  handleAddRecord = (record) => {
    this.addRecords([{ date: record.date, weight: record.weight }]);
  }

  addSampleHistory = () => {
    this.addRecords([
      { date: '2019-02-01', weight: 63.5 },
      { date: '2019-02-02', weight: 64.2 },
      { date: '2019-02-03', weight: 63.8 },
      { date: '2019-02-04', weight: 64.3, style: 'rectRounded', radius: 10 },
      { date: '2019-02-05', weight: 63.3 }
    ]);
  }

  resetHistory = () => {
    this.setState({
      data: []
    });
    localStorage.removeItem(App.dataKey);
  }

  render() {
    return (
      <div className="App">
        <Menu borderless size="huge">
          <Menu.Item>
            <span className="app-title">計るだけ！ダイエット</span>
            ({this.statusLabel()})
            <Dropdown>
              <Dropdown.Menu>
                <Dropdown.Item text='サンプルデータを追加' onClick={this.addSampleHistory} />
                <Dropdown.Item text='リセット' onClick={this.resetHistory} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item position='right'>
            <AddRecordForm onSubmit={this.handleAddRecord} />
          </Menu.Item>
        </Menu>
        <HistoryChart data={this.state.data} />
      </div>
    );
  }
}

export default App;

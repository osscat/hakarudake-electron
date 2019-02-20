import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import AddRecordForm from './AddRecordForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: '2019-02-01',
      history: {
        datasets: [{
          label: '測定値',
          data: [
            { x: '2019-02-01', y: 63.5 }, 
            { x: '2019-02-02', y: 64.2 }, 
            { x: '2019-02-03', y: 63.8 }, 
            { x: '2019-02-04', y: 64.3 }, 
            { x: '2019-02-05', y: 63.3 }
          ],
          fill: false,
          lineTension: 0
        }]
      }
    };

    this.options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'M/D'
            },
            min: this.state.startDate,
            max: moment(this.state.startDate).add(1, 'month')
          }
        }],
        yAxes: [{
          ticks: { min: 60, max: 65 }
        }]
      }
    }

    this.handleAddRecord = this.handleAddRecord.bind(this);
  }

  handleAddRecord(record) {
    // see https://stackoverflow.com/a/49317830
    const datasets = this.state.history.datasets.slice(0);
    const data = datasets[0].data.slice(0);
    data.push({
      x: record.date,
      y: record.weight
    });
    datasets[0].data = data

    this.setState({
      history: Object.assign({}, this.state.history, {
        datasets: datasets
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="top">
          <div>開始日：{this.state.startDate}</div>
          <div>
            <AddRecordForm onSubmit={this.handleAddRecord} />
          </div>
        </div>
        <div className="main">
          <Line data={this.state.history} options={this.options} />
        </div>
      </div>
    );
  }
}

export default App;

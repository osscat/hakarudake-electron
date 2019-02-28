import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { defaults, Line } from 'react-chartjs-2';

defaults.global.defaultFontSize = '16';

export default class HistoryChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {
        datasets: [{
          label: '測定値',
          data: [],
          pointStyle: [],
          pointRadius: [],
          borderColor: 'hsl(39, 100%, 60%)',
          fill: false,
          lineTension: 0        
        }]
      },
      options: {
        title: {
          display: true,
          text: '体重の記録'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            position: 'top',
            time: {
              unit: 'day',
              min: moment(),
              max: moment().add(1, 'month'),
              displayFormats: {
                day: 'M/D'
              }
            }
          }],
          yAxes: [{
            ticks: { min: 50, max: 100 }
          }]
        }
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.data, prevProps.data)) {
      this.rebuildHistory();
      this.adjustAxes();
    }
  }

  rebuildHistory() {
    // see https://stackoverflow.com/a/49317830
    const history = _.cloneDeep(this.state.history);
    const dataset = history.datasets[0];
    const sorted = _.sortBy(this.props.data, 'date');
    dataset.data = sorted.map(v => {
      return {
        x: v.date,
        y: v.weight
      }
    });
    dataset.pointStyle = sorted.map(v => v.style);
    dataset.pointRadius = sorted.map(v => v.radius);
    this.setState({
      history: history
    });
  }

  adjustAxes() {
    let startDate;
    let initailWeight;
    if (this.props.data.length) {
      const first = _.sortBy(this.props.data, 'date')[0];
      startDate = first.date;
      initailWeight = Math.ceil(first.weight);
    } else {
      startDate = moment();
      // データリセットした場合、y軸はそのまま維持する
    }

    const options = _.cloneDeep(this.state.options);
    const xAxis = options.scales.xAxes[0];
    const yAxis = options.scales.yAxes[0];
    xAxis.time.min = startDate;
    xAxis.time.max = moment(startDate).add(1, 'month');
    if (initailWeight) {
      yAxis.ticks.min = initailWeight - 6;
      yAxis.ticks.max = initailWeight + 3;
    }

    this.setState({
      options: options
    });
  }

  render() {
    return (
      <div className="main">
        <Line redraw={true} data={this.state.history} options={this.state.options} />
      </div>
    )
  }
}

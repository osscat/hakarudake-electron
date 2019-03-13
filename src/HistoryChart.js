import _ from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { defaults, Line } from 'react-chartjs-2';

defaults.global.defaultFontSize = '16';

export default class HistoryChart extends PureComponent {
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
        maintainAspectRatio: false,
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
        },
        tooltips: {
          titleFontStyle: 'normal',
          filter: item => this.getRecord(item.index).memo,
          callbacks: {
            title: items => items.length ? this.getRecord(items[0].index).memo : null
          }
        }
      }
    };
  }

  componentDidMount() {
    if (this.props.data.length) {
      this.rebuildHistory();
      this.adjustAxes();
    }
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
        id: v.id,
        x: v.date,
        y: v.weight,
        memo: v.memo
      }
    });
    dataset.pointStyle = sorted.map(v => v.style);
    dataset.pointRadius = sorted.map(v => v.radius);
    dataset.pointHoverRadius = sorted.map(v => v.hoverRadius);
    this.setState({
      history: history
    });
  }

  adjustAxes() {
    let minDate;
    let maxDate;
    let initailWeight;
    if (this.props.data.length) {
      const sorted = _.sortBy(this.props.data, 'date');
      minDate = _.first(sorted).date;
      maxDate = _.last(sorted).date;

      // 少なくとも開始日から1か月間は表示する
      const aMonthAfter = moment(minDate).add(30, 'day')
      if (aMonthAfter.isAfter(maxDate)) {
        maxDate = aMonthAfter;
      }

      initailWeight = Math.ceil(_.first(sorted).weight);
    } else {
      minDate = moment();
      maxDate = moment().add(1, 'month');

      // データリセットした場合、y軸はそのまま維持する
    }

    const options = _.cloneDeep(this.state.options);
    const xAxis = options.scales.xAxes[0];
    const yAxis = options.scales.yAxes[0];
    xAxis.time.min = minDate;
    xAxis.time.max = maxDate;
    if (initailWeight) {
      yAxis.ticks.min = initailWeight - 6;
      yAxis.ticks.max = initailWeight + 3;
    }

    this.setState({
      options: options
    });
  }

  getRecord(index) {
    return this.state.history.datasets[0].data[index];
  }

  onElementsClick = (elems) => {
    if (!elems.length) {
      this.props.onClick(null);
      return
    }
    const record = this.getRecord(elems[0]._index);
    this.props.onClick({
      id: record.id
    });
  }

  render() {
    return (
      <div className="main">
        <Line
          height={400}
          redraw={true}
          onElementsClick={this.onElementsClick}
          data={this.state.history}
          options={this.state.options} />
      </div>
    )
  }
}

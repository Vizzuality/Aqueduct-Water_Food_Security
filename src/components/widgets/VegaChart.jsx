import React from 'react';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { defaultTheme } from 'constants/vega';
import { applyTheme } from 'utils/vega/vega';

class VegaChart extends React.Component {

  componentDidMount() {
    this.resizeEvent = () => {
      this.handleResize();
    };
    window.addEventListener('resize', debounce(this.resizeEvent, 100));

    this.renderChart();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  setSize() {
    this.width = this.chart.offsetWidth;
    this.height = this.chart.offsetHeight;
  }

  parseVega() {
    const size = {
      width: this.width - this.props.data.padding.left - this.props.data.padding.right,
      height: this.height - this.props.data.padding.top - this.props.data.padding.bottom
    };
    const dataObj = applyTheme(this.props.data, defaultTheme, size);
    vega.parse.spec(dataObj, (chart) => {
      const chartVis = chart({
        el: this.chart
      });
      chartVis.update();
    });
  }

  handleResize() {
    this.renderChart();
  }

  renderChart() {
    this.setSize();
    this.parseVega();
  }

  render() {
    return (
      <div className="c-chart">
        <div ref={(c) => { this.chart = c; }} className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  // Define the chart data
  data: React.PropTypes.any.isRequired
};

export default VegaChart;

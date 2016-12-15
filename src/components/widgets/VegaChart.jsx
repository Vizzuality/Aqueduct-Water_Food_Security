import React from 'react';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import defaultTheme from 'data/vega-theme.json';

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
    const subTheme = { padding: { top: 80, left: 40, bottom: 40, right: 20 } };
    const size = {
      width: this.width - subTheme.padding.left - subTheme.padding.right,
      height: this.height - subTheme.padding.top - subTheme.padding.bottom
    };
    // debugger;
    const data = Object.assign({}, this.props.data, size, subTheme);
    const theme = Object.assign({}, defaultTheme);
    console.info('DATA', data);
    console.info('THEME', theme);
    vega.parse.spec(data, theme, (chart) => {
      const chartVis = chart({
        el: this.chart,
        renderer: 'svg'
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

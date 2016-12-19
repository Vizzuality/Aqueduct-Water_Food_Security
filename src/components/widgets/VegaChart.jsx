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
    const defaultPadding = { top: 40, left: 40, bottom: 40, right: 40 };
    const padding = this.props.data.padding || defaultPadding;
    const size = {
      width: this.width - padding.left - padding.right,
      height: this.height - padding.top - padding.bottom
    };
    const data = Object.assign({}, this.props.data, size);

    vega.parse.spec(data, defaultTheme, (chart) => {
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

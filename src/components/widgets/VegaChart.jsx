import React from 'react';
import vega from 'vega';
import jsonExample from 'data/widget-chart-example';

class VegaChart extends React.Component {

  componentDidMount() {
    this.resizeEvent = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.resizeEvent);

    this.renderChart();
  }

  componentDidUpdate() {
    // We should check if the data has changed
    // this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  getData() {
    // const { data } = this.props;
    // let dataObj = {};
    const dataObj = jsonExample;

    //
    // if (typeof data === 'object') {
    //   dataObj = data;
    // } else if (typeof data === 'string') {
    //   dataObj = JSON.parse(data);
    // }
    //
    let widthSpace = 50;
    let heightSpace = 50;

    if (dataObj.padding) {
      widthSpace = (dataObj.padding.left || 20) + (dataObj.padding.right || 20);
      heightSpace = (dataObj.padding.top || 25) + (dataObj.padding.bottom || 25);
    }

    dataObj.width = this.width - widthSpace;
    dataObj.height = this.height - heightSpace;

    return dataObj;
  }

  setSize() {
    this.width = this.chartContainer.offsetWidth;
    this.height = this.chartContainer.offsetHeight;
  }

  parseVega() {
    const dataObj = this.getData();
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
      <div ref={(c) => { this.chartContainer = c; }} className="c-chart">
        <div ref={(c) => { this.chart = c; }} className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  // /**
  //  * Define the chart data
  //  */
  // data: React.PropTypes.any.isRequired,
  // /**
  //  * Remove the min-height in component
  //  */
  // small: React.PropTypes.bool
};

export default VegaChart;

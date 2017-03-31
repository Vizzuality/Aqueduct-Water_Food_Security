import React from 'react';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import VegaChartTooltip from 'components/widgets/VegaChartTooltip';

export default class VegaChart extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerResize = debounce(this.triggerResize.bind(this), 250);
  }

  componentDidMount() {
    this.mounted = true;
    this.renderChart();
    window.addEventListener('resize', this.triggerResize);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('resize', this.triggerResize);
  }

  setSize() {
    if (this.chart) {
      this.width = this.chart.offsetWidth;
      this.height = this.chart.offsetHeight;
    }
  }

  parseVega() {
    const defaultPadding = { left: 20, right: 20 };
    const padding = this.props.data.padding || defaultPadding;
    const size = {
      width: this.width - padding.left - padding.right,
      height: this.props.data.height || 260
    };

    const data = Object.assign({}, this.props.data, size);

    this.props.toggleLoading && this.props.toggleLoading(true);

    vega.parse.spec(data, this.props.theme, (err, chart) => {
      this.props.toggleLoading && this.props.toggleLoading(false);
      if (!err) {
        const vis = chart({
          el: this.chart,
          renderer: 'canvas'
        });

        vis.update();

        // TOOLTIP
        const tooltip = data.interactionConfig && data.interactionConfig.find(i => i.name === 'tooltip');

        if (tooltip) {
          // TODO: Type signal
          if (tooltip.type === 'signal') {
            vis.onSignal('onMousemove', (event, x0) => {
              const visData = vis.data().table;
              let item;

              if (typeof x0 === 'string') {
                item = visData.find(d => d.x === x0);
              }

              if (typeof x0 === 'number') {
                const bisectDate = d3.bisector(d => d.x).left;
                const i = bisectDate(visData, x0, 1);
                const d0 = visData[i - 1];
                const d1 = visData[i];
                item = (d0 && d1 && (x0 - d0.x > d1.x - x0)) ? d1 : d0;
              }

              if (item) {
                return this.props.toggleTooltip(true, {
                  follow: true,
                  children: VegaChartTooltip,
                  childrenProps: {
                    item
                  }
                });
              }
              return null;
            });

          } else {

            vis.on('mousemove', (e, item) => {
              if (item && item.type !== 'axis') {
                return this.props.toggleTooltip(true, {
                  position: {
                    x: e.clientX,
                    y: e.clientY
                  },
                  children: VegaChartTooltip,
                  childrenProps: {
                    data: item.datum,
                    config: tooltip.config
                  }
                });
              }
              return null;
            });
          }

          vis.on('mouseout', () => {
            return this.props.toggleTooltip(false);
          });
        }
      }
    });
  }

  triggerResize() {
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
  data: React.PropTypes.any.isRequired,
  theme: React.PropTypes.object,
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};

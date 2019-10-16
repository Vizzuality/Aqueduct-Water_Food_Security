import React from 'react';
import PropTypes from 'prop-types';
import vega from 'vega';
import { bisector } from 'd3-array';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import VegaChartTooltip from 'components/widgets/VegaChartTooltip';
import camelcaseKeys from 'camelcase-keys';

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
    const { widgetConfig } = this.props;
    return !isEqual(nextProps.widgetConfig, widgetConfig);
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
    const { data, widgetConfig, theme, toggleLoading, toggleTooltip } = this.props;

    const defaultPadding = { left: 20, right: 20 };
    const padding = widgetConfig.padding || defaultPadding;

    const size = {
      width: this.width - padding.left - padding.right,
      height: widgetConfig.height || 260
    };

    delete widgetConfig.data[0].format;
    delete widgetConfig.data[0].url;

    widgetConfig.data[0] = {
      ...widgetConfig.data[0],
      values: data
    };

    const config = Object.assign({}, widgetConfig, size);

    if (this.mounted && toggleLoading) toggleLoading(true);

    const parsedConfig = camelcaseKeys(config, { deep: true });

    vega.parse.spec(({ ...parsedConfig, data: widgetConfig.data }), theme, (err, chart) => {
      if (!this.mounted) {
        return;
      }
      if (toggleLoading) toggleLoading(false);
      if (!err) {
        const vis = chart({
          el: this.chart,
          renderer: 'canvas'
        });

        vis.update();

        // TOOLTIP
        const tooltip = config.interaction_config && config.interaction_config.find(i => i.name === 'tooltip');

        if (tooltip) {
          const { type, config: _config } = tooltip;

          // TODO: Type signal
          if (type === 'signal') {
            vis.onSignal('onMousemove', (event, { xval }) => {
              const visData = vis.data()[_config.table.from];
              let items = [];

              if (typeof xval === 'number') {
                const bisectVal = _config.table.bisect;
                const bisectDate = bisector(d => d[bisectVal]).left;
                const i = bisectDate(visData, xval, 1);
                const d0 = visData[i - 1];
                const d1 = visData[i];
                const selected = (d0 && d1 && (xval - d0[bisectVal] > d1[bisectVal] - xval))
                  ? d1 : d0;
                items = visData.filter(d => d[bisectVal] === selected[bisectVal]);
              }

              if (items.length) {
                return toggleTooltip(true, {
                  follow: true,
                  children: VegaChartTooltip,
                  childrenProps: {
                    data: items,
                    config: _config,
                  }
                });
              }
              return null;
            });
          } else {
            vis.on('mousemove', (e, item) => {
              if (item && item.type !== 'axis') {
                return toggleTooltip(true, {
                  position: {
                    x: e.clientX,
                    y: e.clientY
                  },
                  children: VegaChartTooltip,
                  childrenProps: {
                    data: item.datum,
                    config: _config,
                  }
                });
              }
              return null;
            });
          }

          vis.on('mouseout', () => toggleTooltip(false));
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
  widgetConfig: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  theme: PropTypes.object,
  toggleLoading: PropTypes.func,
  toggleTooltip: PropTypes.func
};

VegaChart.defaultProps = {
  theme: null,
  toggleLoading: () => null,
  toggleTooltip: () => null,
};

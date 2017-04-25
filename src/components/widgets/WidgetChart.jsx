import React from 'react';
import { getObjectConversion } from 'aqueduct-components';

import WidgetText from 'components/widgets/WidgetText';
import theme from 'data/vega-theme.json';
import VegaChart from 'components/widgets/VegaChart';

class WidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const widgetConfig = getObjectConversion(this.props.config, this.props.filters, 'widget');

    if (widgetConfig.type === 'text') {
      return (
        <WidgetText
          widgetConfig={widgetConfig}
          toggleLoading={this.props.toggleLoading}
        />);
    }

    return (
      <VegaChart
        theme={theme}
        data={widgetConfig}
        toggleLoading={this.props.toggleLoading}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

WidgetChart.propTypes = {
  config: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};

export default WidgetChart;

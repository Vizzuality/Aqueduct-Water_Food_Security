import React from 'react';

import WidgetText from 'components/widgets/WidgetText';
import theme from 'data/vega-theme.json';
import VegaChart from 'components/widgets/VegaChart';

function WidgetChart(props) {
  const { config } = props;

  if (config.type === 'text') {
    return (
      <WidgetText
        widgetConfig={config}
        toggleLoading={props.toggleLoading}
      />);
  }

  return (
    <VegaChart
      theme={theme}
      data={config}
      toggleLoading={props.toggleLoading}
      toggleTooltip={props.toggleTooltip}
    />
  );
}

WidgetChart.propTypes = {
  config: React.PropTypes.object,
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};

export default WidgetChart;

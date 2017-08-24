import React from 'react';

import WidgetText from 'components/widgets/WidgetText';
import theme from 'data/vega-theme.json';
import VegaChart from 'components/widgets/VegaChart';
import { getObjectConversion } from 'aqueduct-components';

function WidgetChart(props) {
  const { widget, filters } = props;
  const widgetParsed = getObjectConversion(
    widget,
    filters,
    widget.widgetConfig.dictionary || 'widget-2010',
    widget.widgetConfig.paramsConfig,
    widget.widgetConfig.sqlConfig
  );

  if (widget.widgetConfig.type === 'text') {
    return (
      <WidgetText
        widgetConfig={widgetParsed.widgetConfig}
        toggleLoading={props.toggleLoading}
      />);
  }

  return (
    <VegaChart
      theme={theme}
      data={widgetParsed.widgetConfig}
      toggleLoading={props.toggleLoading}
      toggleTooltip={props.toggleTooltip}
    />
  );
}

WidgetChart.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};

export default WidgetChart;

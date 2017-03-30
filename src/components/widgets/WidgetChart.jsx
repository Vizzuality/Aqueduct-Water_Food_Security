import React from 'react';
import WidgetText from 'components/widgets/WidgetText';
import { VegaChart } from 'aqueduct-components';
import { getObjectConversion } from 'utils/filters/filters';
import theme from 'data/vega-theme.json';

class WidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // this.props.getWidgetBySlug(this.props.slug);
  }

  render() {
    const widgetConfig = getObjectConversion(this.props.config, this.props.filters, 'widget');

    if (widgetConfig.type === 'text') {
      return <WidgetText widgetConfig={widgetConfig} toggleLoading={this.props.toggleLoading} />;
    }

    return <VegaChart theme={theme} data={widgetConfig} toggleLoading={this.props.toggleLoading} />;
  }
}

WidgetChart.propTypes = {
  config: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default WidgetChart;

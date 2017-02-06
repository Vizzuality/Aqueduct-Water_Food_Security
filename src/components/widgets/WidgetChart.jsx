import React from 'react';
import WidgetText from 'components/widgets/WidgetText';
import VegaChart from 'components/widgets/VegaChart';
import { getWidgetSql } from 'utils/filters/filters';

class WidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // this.props.getWidgetBySlug(this.props.slug);
  }

  render() {
    const widgetConfig = getWidgetSql(this.props.config, this.props.filters);

    if (widgetConfig.type === 'text') {
      return <WidgetText widgetConfig={widgetConfig} toggleLoading={this.props.toggleLoading} />;
    }

    return <VegaChart data={widgetConfig} toggleLoading={this.props.toggleLoading} />;
  }
}

WidgetChart.propTypes = {
  config: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default WidgetChart;

import React from 'react';
import VegaChart from 'components/widgets/VegaChart';
import { getWidgetSql } from 'utils/filters/filters';

class WidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    // this.props.getWidgetBySlug(this.props.slug);
  }

  render() {
    const widgetConfig = getWidgetSql(this.props.config, this.props.filters);
    return (
      <VegaChart data={widgetConfig} />
    );
  }
}

WidgetChart.propTypes = {
  config: React.PropTypes.object,
  filters: React.PropTypes.object
  // /**
  //  * Define the slug of the widget
  //  */
  // slug: React.PropTypes.any.isRequired,
  // /**
  //  * Define the function to get the widget slug data
  //  */
  // getWidgetBySlug: React.PropTypes.func.isRequired,
  // /**
  //  * Define the function to get the widget slug data
  //  */
  // data: React.PropTypes.object,
  // /**
  //  * Remove the min-height in component
  //  */
  // small: React.PropTypes.bool
};

export default WidgetChart;

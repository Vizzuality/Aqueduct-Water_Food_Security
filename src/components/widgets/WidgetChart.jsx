import React from 'react';
import VegaChart from 'components/widgets/VegaChart';

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
    // if (this.props.data) {
    //   const widget = this.props.data[this.props.slug];
    //   if (widget && widget.widget_config) {
    //     return (
    //       <VegaChart data={data}/>
    //     );
    //   }
    // }
    // return null;
    return (
      <VegaChart data={this.props.config} />
    );
  }
}

WidgetChart.propTypes = {
  config: React.PropTypes.object
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

import React from 'react';
import * as d3 from 'd3';

class WidgetText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    this.getWidgetData();
  }

  componentWillUpdate() {
    // this.getWidgetData();
  }

  getWidgetData() {
    const url = this.props.widgetConfig ? this.props.widgetConfig.data.url : null;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function onStateChange() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const data = JSON.parse(xmlhttp.responseText);
          this.setState({ data: data.rows[0] });
        } else {
          console.error('error');
        }
      }
    }.bind(this);
  }


  render() {
    const { templateConfig } = this.props.widgetConfig;
    let { template } = this.props.widgetConfig;

    if (this.state.data) {
      templateConfig.forEach((param) => {
        let value = this.state.data[param.key];
        if (param.format) {
          value = d3.format(param.format)(value);
        }
        template = template.replace(new RegExp(`{{${param.key}}}`, 'g'), `<span class="widget-text-${param.key}">${value}</span>`);
      });

      return (
        <div className="c-widget-text" dangerouslySetInnerHTML={{ __html: template }} />
      );
    }

    return null;
  }
}

WidgetText.propTypes = {
  widgetConfig: React.PropTypes.object
};

export default WidgetText;

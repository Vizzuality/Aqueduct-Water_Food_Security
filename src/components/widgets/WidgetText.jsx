import React from 'react';
import 'whatwg-fetch';
import d3 from 'd3';

class WidgetText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const url =  this.props.widgetConfig ? this.props.widgetConfig.data.url : null;
    if(url) {
      fetch(url)
        .then((response) => {
          if(response.ok) response.json();
        })
        .then((data) => {
          this.setState({ data: data.rows });
        })
        .catch((err) => {
          throw new Error(err)
        });
    }
  }

  render() {
    let { template, templateConfig } = this.props.widgetConfig;
    if (this.state.data) {
      templateConfig.forEach((param) => {
        let value = this.state.data[param.key];
        if(param.format) {
          const format = d3.format(param.format);
          value = format(value);
        }
        template = template.replace(new RegExp(`{{${param.key}}}`, 'g'), `<span class="widget-text-${param.key}">${value}</span>`);
      });

      return (
        <div className="c-widget-text" dangerouslySetInnerHTML={{ __html: template }}></div>
      );
    }

    return null;
  }
}

WidgetText.propTypes = {
  widgetConfig: React.PropTypes.object
};

export default WidgetText;

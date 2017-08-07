import React from 'react';
import { format } from 'd3-format';

class WidgetText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.xhr = new XMLHttpRequest();
  }

  componentWillMount() {
    this.getWidgetData();
  }


  componentDidUpdate(prevProps) {
    if (this.props.widgetConfig.data.url !== prevProps.widgetConfig.data.url) this.getWidgetData();
  }

  componentWillUnmount() {
    this.xhr.abort();
  }

  getWidgetData() {
    const url = this.props.widgetConfig ? this.props.widgetConfig.data.url : null;

    if (this.xhr.readyState !== 4) this.xhr.abort();
    this.xhr.open('GET', url);
    this.xhr.send();

    // Toggle loading
    this.props.toggleLoading(true);

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          const data = JSON.parse(this.xhr.responseText);
          this.setState({ data: data.rows[0] });
        } else {
          console.error('error');
        }
        this.props.toggleLoading(false);
      }
    };
  }


  render() {
    const { templateConfig } = this.props.widgetConfig;
    let { template } = this.props.widgetConfig;

    if (this.state.data) {
      templateConfig.forEach((param) => {
        let value = this.state.data[param.key];

        const suffix = param.suffix || '';

        if (param.format) {
          value = (!isNaN(parseInt(value))) ? format(param.format)(parseInt(value)) : value;
        }

        const span = value !== '' ? `<span class="widget-text-token -${param.key}">${value}${suffix}</span>` : '';

        template = template.replace(new RegExp(`##${param.key}##`, 'g'), span);
      });

      return (
        <div className="c-widget-text">
          <p dangerouslySetInnerHTML={{ __html: template }} />
        </div>
      );
    }

    return null;
  }
}

WidgetText.propTypes = {
  widgetConfig: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default WidgetText;

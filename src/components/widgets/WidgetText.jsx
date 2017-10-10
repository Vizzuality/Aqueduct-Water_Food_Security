import React from 'react';
import { format } from 'd3-format';

class WidgetText extends React.Component {
  render() {
    const { templateConfig } = this.props.widgetConfig;
    const data = this.props.data[0]

    let { template } = this.props.widgetConfig;

    if (data) {
      templateConfig.forEach((param) => {
        let value = data[param.key];

        const suffix = param.suffix || '';

        if (param.format) {
          value = (!isNaN(parseInt(value))) ? format(param.format)(parseInt(value)) : value;
        }

        const span = value !== '' ? `<span class="widget-text-token -${param.key}">${value}${suffix}</span>` : '';

        template = template.replace(new RegExp(`##${param.key}##`, 'g'), span);
      });
    } else {
      templateConfig.forEach((param) => {
        template = template.replace(new RegExp(`##${param.key}##`, 'g'), 'No data');
      });
    }

    return (
      <div className="c-widget-text">
        <p dangerouslySetInnerHTML={{ __html: template }} />
      </div>
    );

  }
}

WidgetText.propTypes = {
  data: React.PropTypes.array,
  widgetConfig: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default WidgetText;

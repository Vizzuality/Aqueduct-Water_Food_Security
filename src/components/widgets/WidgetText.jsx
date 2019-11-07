import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

class WidgetText extends PureComponent {
  getWidgetTemplate() {
    const { widgetConfig, filters } = this.props;
    const { year } = filters;
    const {
      template,
      template_baseline: templateBaseline,
      template_future: templateFuture
    } = widgetConfig;
    const isBaseline = year === 'baseline';
    let widgetTemplate = template || '';

    if (isBaseline && templateBaseline) widgetTemplate = templateBaseline;
    if (!isBaseline && templateFuture) widgetTemplate = templateFuture;

    return widgetTemplate;
  }

  render() {
    const { widgetConfig, data } = this.props;
    const { template_config: templateConfig } = widgetConfig;
    const _data = data[0];

    let template = this.getWidgetTemplate();

    if (_data) {
      templateConfig.forEach((param) => {
        let value = _data[param.key];

        const suffix = param.suffix || '';

        if (param.format) {
          value = (!Number.isNaN(parseInt(value, 10)))
            ? format(param.format)(parseInt(value, 10)) : value;
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
  data: PropTypes.array,
  filters: PropTypes.object.isRequired,
  widgetConfig: PropTypes.object.isRequired
};

WidgetText.defaultProps = { data: [] };

export default WidgetText;

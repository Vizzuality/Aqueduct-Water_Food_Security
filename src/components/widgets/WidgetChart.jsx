import React from 'react';
import isEqual from 'lodash/isEqual';

import WidgetText from 'components/widgets/WidgetText';
import theme from 'data/vega-theme.json';
import VegaChart from 'components/widgets/VegaChart';
import { getObjectConversion, get } from 'aqueduct-components';

class WidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      widgetConfig: {}
    };
  }

  componentWillMount() {
    const { widget, filters } = this.props;
    this.fetchData({ widget, filters });
  }

  componentWillReceiveProps(nextProps) {
    const { widget: nextWidget, filters: nextFilters } = nextProps;
    const { widget, filters } = this.props;
    if (
      !isEqual(nextWidget, widget) ||
      !isEqual(nextFilters, filters)
    ) {
      this.fetchData({ widget: nextWidget, filters: nextFilters });
    }
  }

  fetchData({ widget, filters }) {
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.paramsConfig,
      widget.widgetConfig.sqlConfig
    );

    const { url } = widgetParsed.widgetConfig.data[0] || widgetParsed.widgetConfig.data;

    if (this.request && this.request.readyState !== 4) {
      this.request.abort();
    }

    if (url) {
      this.props.toggleLoading(true);

      this.request = get({
        url: url,
        onSuccess: (response) => {
          this.setState({
            data: response.rows,
            widgetConfig: widgetParsed.widgetConfig
          }, () => {
            this.props.toggleLoading(false);

            if (!this.state.data.length) {
              this.props.toggleVisibility(false);
            }
          });
        },
        onError: (err) => {
          this.props.toggleLoading(false);
        }
      })
    }
  }

  render() {
    const { widgetConfig, data } = this.state;

    if (!!data.length && widgetConfig.type === 'text') {
      return (
        <WidgetText
          widgetConfig={widgetConfig}
          data={data}
          toggleLoading={this.props.toggleLoading}
        />
      );
    }

    if (!!data.length) {
      return (
        <VegaChart
          theme={theme}
          widgetConfig={widgetConfig}
          data={data}
          toggleLoading={this.props.toggleLoading}
          toggleTooltip={this.props.toggleTooltip}
        />
      );
    }

    return null;
  }
}

WidgetChart.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func,
  toggleVisibility: React.PropTypes.func
};

export default WidgetChart;

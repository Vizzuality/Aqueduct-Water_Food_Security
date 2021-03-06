import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import axios from 'axios';

// components
import WidgetText from 'components/widgets/WidgetText';
import VegaChart from 'components/widgets/VegaChart';
import theme from 'data/vega-theme.json';

// utils
import { getObjectConversion } from 'utils/filters';

class WidgetChart extends PureComponent {
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
      !isEqual(nextWidget, widget)
      || !isEqual(nextFilters, filters)
    ) {
      this.fetchData({ widget: nextWidget, filters: nextFilters });
    }
  }

  fetchData({ widget, filters }) {
    const { toggleLoading, toggleVisibility } = this.props;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.params_config,
      widget.widgetConfig.sql_config
    );

    if (!widgetParsed.widgetConfig.data) return;

    let _url = null;

    if (Array.isArray(widgetParsed.widgetConfig.data)) {
      const dataUrl = (widgetParsed.widgetConfig.data).find(_d => 'url' in _d) || {};
      if (dataUrl) _url = dataUrl.url;
    } else {
      _url = widgetParsed.widgetConfig.data.url;
    }

    if (_url) {
      toggleLoading(true);

      axios.get(_url)
        .then((response) => {
          if (toggleVisibility) toggleVisibility(!!response.data.rows.length);


          requestAnimationFrame(() => {
            this.setState({
              data: response.data.rows,
              widgetConfig: widgetParsed.widgetConfig
            }, () => { toggleLoading(false); });
          });
        })
        .catch(() => {
          toggleLoading(false);
          if (toggleVisibility) toggleVisibility(false);
        });
    }
  }

  render() {
    const { filters, toggleLoading, toggleTooltip } = this.props;
    const { widgetConfig, data } = this.state;

    if (widgetConfig.type === 'text') {
      return (
        <WidgetText
          widgetConfig={widgetConfig}
          data={data}
          filters={filters}
          toggleLoading={toggleLoading}
        />
      );
    }

    if (data.length) {
      return (
        <VegaChart
          theme={theme}
          widgetConfig={widgetConfig}
          data={data}
          toggleLoading={toggleLoading}
          toggleTooltip={toggleTooltip}
        />
      );
    }

    return null;
  }
}

WidgetChart.propTypes = {
  widget: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func
};

WidgetChart.defaultProps = { toggleVisibility: null };

export default WidgetChart;

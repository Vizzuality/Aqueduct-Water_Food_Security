import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Spinner } from 'aqueduct-components';

// components
import WidgetButtons from 'components/widgets/WidgetButtons';
import WidgetChart from 'components/widgets/widget/chart';
import WidgetModal from 'components/modal/WidgetModal';
import WidgetEmbedModal from 'components/modal/WidgetEmbedModal';
import MapPDFModal from 'components/modal/MapPDFModal';
import WidgetImageModal from 'components/modal/WidgetImageModal';

// utils
import { getObjectConversion } from 'utils/filters';
import { getMinWidgetContentHeight } from './utils';

class Widget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      visibility: true
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getName(widgetParsed) {
    const { filters } = this.props;
    const { name, widgetConfig } = widgetParsed;
    const proyection = (filters.year === 'baseline') ? 'baseline' : 'future';

    return (widgetConfig.titleConfig) ? widgetConfig.titleConfig[proyection] : name;
  }

  toggleLoading(bool) {
    if (this.mounted) this.setState({ loading: bool });
  }

  toggleVisibility(bool) {
    if (this.mounted) this.setState({ visibility: bool });
  }

  triggerAction(action) {
    const { toggleModal, filters, widget } = this.props;

    switch (action) {
      case 'info':
        toggleModal(true, {
          children: WidgetModal,
          size: '-medium',
          childrenProps: {
            filters,
            widget
          }
        });
        break;
      case 'embed':
        toggleModal(true, {
          children: WidgetEmbedModal,
          size: '-medium',
          childrenProps: {
            filters,
            widget
          }
        });
        break;
      case 'image':
        toggleModal(true, {
          children: WidgetImageModal,
          size: '-medium',
          childrenProps: {
            filters,
            widget
          }
        });
        break;

      case 'pdf':
        toggleModal(true, {
          children: MapPDFModal,
          size: '-full',
          childrenProps: {
          }
        });
        break;

      default:
        console.info('The action is not supported by this function');
    }
  }

  render() {
    const { widget, filters, warning, className } = this.props;
    const { visibility, loading } = this.state;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.params_config,
      widget.widgetConfig.sql_config
    );
    const { widgetConfig, queryUrl } = widgetParsed;
    const minHeight = getMinWidgetContentHeight(widgetConfig);

    const componentClass = classnames('c-widget', {
      '-hidden': (!visibility && (filters.page !== 'compare')),
      [className]: !!className
    });

    return (
      <div
        className={componentClass}
        ref={(el) => { this.widgetElem = el; }}
      >
        <div>
          {widgetConfig.type !== 'text' && (
            <header className="widget-header">
              <div className="widget-titles">
                <h2 className="widget-title">{this.getName(widgetParsed)}</h2>
              </div>

              <WidgetButtons
                widgetElem={this.widgetElem}
                queryUrl={queryUrl}
                triggerAction={this.triggerAction}
              />
            </header>
          )}

          <div
            className="widget-content"
            style={{ ...minHeight && { minHeight } }}
          >
            {!visibility && filters.page === 'compare'
              && (
                <div
                  style={{
                    position: (widgetConfig.type === 'text') ? 'absolute' : 'relative',
                    top: 0,
                    left: 0,
                    ...minHeight && { minHeight }
                  }}
                  className="widget-noresults"
                >
                    No data available
                </div>
              )}
            <Spinner isLoading={loading} />

            <WidgetChart
              widget={widget}
              filters={filters}
              config={widgetConfig}
              toggleLoading={this.toggleLoading}
              toggleVisibility={this.toggleVisibility}
            />

            {!!warning && (
              <div className="widget-warning">
                {warning}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  className: PropTypes.string,
  warning: PropTypes.node,
  widget: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
};

Widget.defaultProps = {
  className: null,
  warning: null
};

export default Widget;

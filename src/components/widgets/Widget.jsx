import React from 'react';
import classnames from 'classnames';
import { dispatch } from 'main';

// Components
import WidgetButtons from 'components/widgets/WidgetButtons';
import WidgetChart from 'containers/widgets/WidgetChart';
import WidgetModal from 'components/modal/WidgetModal';
import WidgetEmbedModal from 'components/modal/WidgetEmbedModal';
import MapPDFModal from 'components/modal/MapPDFModal';
import WidgetImageModal from 'components/modal/WidgetImageModal';
import { Spinner, toggleModal, getObjectConversion } from 'aqueduct-components';

class Widget extends React.Component {

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

  triggerAction(action) {
    switch (action) {
      case 'info':
        dispatch(toggleModal(true, {
          children: WidgetModal,
          size: '-medium',
          childrenProps: {
            filters: this.props.filters,
            widget: this.props.widget
          }
        }));
        break;
      case 'embed':
        dispatch(toggleModal(true, {
          children: WidgetEmbedModal,
          size: '-medium',
          childrenProps: {
            filters: this.props.filters,
            widget: this.props.widget
          }
        }));
        break;
      case 'image':
        dispatch(toggleModal(true, {
          children: WidgetImageModal,
          size: '-medium',
          childrenProps: {
            filters: this.props.filters,
            widget: this.props.widget
          }
        }));
        break;

      case 'pdf':
        dispatch(toggleModal(true, {
          children: MapPDFModal,
          size: '-full',
          childrenProps: {
          }
        }));
        break;

      default:
        console.info('The action is not supported by this function');
    }
  }

  toggleLoading(bool) {
    this.mounted && this.setState({ loading: bool });
  }

  toggleVisibility(bool) {
    this.mounted && this.setState({ visibility: bool });
  }

  getMinWidgetContentHeight(widgetConfig) {
    const height = widgetConfig.height || 0;
    const paddingTop = (widgetConfig.padding) ? widgetConfig.padding.top : 0;
    const paddingBottom = (widgetConfig.padding) ? widgetConfig.padding.bottom : 0;

    return height + paddingTop + paddingBottom;
  }

  render() {
    const { widget, filters } = this.props;

    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.paramsConfig,
      widget.widgetConfig.sqlConfig
    );

    const { name, description, widgetConfig, queryUrl } = widgetParsed;

    // if (widget.id === 'af969fd8-fd47-430d-ad13-9113e42e9fed') {
    //   console.log(JSON.stringify(widgetParsed.widgetConfig));
    // }

    const className = classnames({
      '-hidden': (!this.state.visibility && (filters.page !== 'compare')),
      [this.props.className]: !!this.props.className
    });

    return (
      <div className={`c-widget ${className}`} ref={el => this.widgetElem = el}>
        <div>
          {widgetConfig.type !== 'text' &&
            <header className="widget-header">
              <div className="widget-titles">
                <h2 className="widget-title">{name}</h2>
                {/* <h3 className="widget-description">{description}</h3> */}
              </div>

              <WidgetButtons
                widgetElem={this.widgetElem}
                queryUrl={queryUrl}
                triggerAction={this.triggerAction}
              />
            </header>
          }

          <div
            className="widget-content"
            style={{
              minHeight: this.getMinWidgetContentHeight(widgetConfig)
            }}
          >
            {/* <p style={{color: 'black'}}>{`${config.API_URL}/dataset/${this.props.widget.dataset}/widget/${this.props.widget.id}`}</p> */}
            {!this.state.visibility && filters.page === 'compare' &&
              <div
                style={{
                  position: (widgetConfig.type === 'text') ? 'absolute' : 'relative',
                  top: 0,
                  left: 0,
                  minHeight: this.getMinWidgetContentHeight(widgetConfig)
                }}
                className="widget-noresults"
              >
                  No data available
              </div>
            }

            <Spinner isLoading={this.state.loading} />

            <WidgetChart
              widget={widget}
              filters={filters}
              config={widgetConfig}
              toggleLoading={this.toggleLoading}
              toggleVisibility={this.toggleVisibility}
            />

          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  className: React.PropTypes.string,
  widget: React.PropTypes.object,
  filters: React.PropTypes.object
};

export default Widget;

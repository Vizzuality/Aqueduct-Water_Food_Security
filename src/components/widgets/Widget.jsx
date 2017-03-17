import React from 'react';
import WidgetButtons from 'components/widgets/WidgetButtons';
import WidgetChart from 'components/widgets/WidgetChart';
import WidgetModal from 'components/modal/WidgetModal';
import EmbedModal from 'components/modal/EmbedModal';
import { Spinner } from 'aqueduct-components';

class Widget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
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
        this.props.toggleModal(true, {
          children: WidgetModal,
          size: '-medium',
          childrenProps: {
            filters: this.props.filters,
            widget: this.props.widget
          }
        });
        break;
      case 'embed':
        this.props.toggleModal(true, {
          children: EmbedModal,
          size: '-medium',
          childrenProps: {
            filters: this.props.filters,
            widget: this.props.widget
          }
        });
        break;

      default:
        console.info('The action is not supported by this function');
    }
  }

  toggleLoading(bool) {
    this.mounted && this.setState({ loading: bool });
  }

  render() {
    const { name, description, widgetConfig, queryUrl } = this.props.widget;
    return (
      <div className={`c-widget ${this.props.className ? this.props.className : ''}`}>
        <div>
          <header className="widget-header">
            <div className="widget-titles">
              <h2 className="widget-title">{name}</h2>
              <h3 className="widget-description">{description}</h3>
            </div>
            <WidgetButtons queryUrl={queryUrl} triggerAction={this.triggerAction} />
          </header>
          <div className="widget-content">
            <Spinner isLoading={this.state.loading} />
            <WidgetChart config={widgetConfig} filters={this.props.filters} toggleLoading={this.toggleLoading} />
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  className: React.PropTypes.string,
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleModal: React.PropTypes.func
};

export default Widget;

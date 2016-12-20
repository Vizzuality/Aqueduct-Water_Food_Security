import React from 'react';
import WidgetButtons from 'components/widgets/WidgetButtons';
import WidgetChart from 'components/widgets/WidgetChart';
import InfoModal from 'components/modal/InfoModal';

class Widget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    if (action === 'info') {
      this.props.toggleModal(true, {
        children: InfoModal,
        size: '-medium',
        childrenProps: {
          filters: this.props.filters,
          widget: this.props.widget
        }
      });
    }
  }

  render() {
    const { name, description, widgetConfig } = this.props.widget;
    return (
      <div className="c-widget">
        <div>
          <header className="widget-header">
            <div className="widget-titles">
              <h2 className="widget-title">{name}</h2>
              <h3 className="widget-description">{description}</h3>
            </div>
            <WidgetButtons triggerAction={this.triggerAction} />
          </header>
          <div className="widget-content">
            {/* WidgetLegend */}
            <WidgetChart config={widgetConfig} filters={this.props.filters} />
            {/* WidgetBaseline */}
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleModal: React.PropTypes.func
};


export default Widget;

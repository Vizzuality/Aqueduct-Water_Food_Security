import React from 'react';
import WidgetButtons from 'components/widgets/WidgetButtons';
import WidgetChart from 'components/widgets/WidgetChart';

class Widget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    console.info(action);
  }

  render() {
    const { title, subtitle, buttons } = this.props.widget;
    return (
      <div className="c-widget">
        <div>
          <header className="widget-header">
            <div className="widget-titles">
              <h2>{title}</h2>
              <h3>{subtitle}</h3>
            </div>
            <WidgetButtons buttons={buttons} triggerAction={this.triggerAction} />
          </header>
          <div className="widget-content">
            {/* WidgetLegend */}
            <WidgetChart />
            {/* WidgetBaseline */}
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  widget: React.PropTypes.object
};


export default Widget;

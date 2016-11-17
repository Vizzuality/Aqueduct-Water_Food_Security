import React from 'react';
import WidgetButtons from 'components/widgets/WidgetButtons';

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
    return (
      <div className="c-widget">
        <div>
          <header className="widget-header">
            <h2>Agricultural Exposure to Water Stress</h2>
            <WidgetButtons triggerAction={this.triggerAction} />
          </header>
          <div className="widget-content">
            {/* WidgetLegend */}
            {/* WidgetGraph */}
            {/* WidgetBaseline */}
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
};


export default Widget;

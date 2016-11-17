import React from 'react';

class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="c-widget">
        <div>
          <header className="widget-header">
            <h2>Agricultural Exposure to Water Stress</h2>
            {/* WidgetHeader */}
            {/* WidgetButtons */}
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

WidgetList.propTypes = {
};


export default WidgetList;

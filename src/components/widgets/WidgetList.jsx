import React from 'react';
import Widget from 'components/widgets/Widget';
import Spinner from 'components/common/Spinner';

export default class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // Return a array of Widget components
  getWidgets() {
    const widgetList = [];
    let widget;
    this.props.datasetsActive.list.forEach((dataset, index) => {
      if (dataset.widget.length) {
        widget = dataset.widget[0].attributes;
        // Vega type widget doesn't have 'type' property
        if (!Object.prototype.hasOwnProperty.call(widget.widgetConfig, 'type')) {
          widgetList.push(
            <div key={index} className={'column small-12'}>
              <Widget widget={widget} />
            </div>
          );
        }
      }
    });
    return widgetList;
  }

  render() {
    const widgetList = this.getWidgets();
    return (
      <div className="c-widget-list">
        {this.props.datasets.waitingForFetch ? <Spinner isLoading={this.props.datasets.waitingForFetch} /> :
          <div className="row collapse">{widgetList}</div>
        }
      </div>
    );
  }
}

WidgetList.propTypes = {
  // STORE
  datasets: React.PropTypes.object,
  // SELECTOR
  datasetsActive: React.PropTypes.object
};

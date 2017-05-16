import React from 'react';
import classnames from 'classnames';
import Widget from 'components/widgets/Widget';
import { Spinner } from 'aqueduct-components';

export default class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // Return a array of Widget components
  getWidgets() {
    const { grid, widgetsActive, filters } = this.props;
    const widgetList = [];

    const gridClass = classnames({
      'small-12': !grid,
      [grid]: !!grid
    });

    widgetsActive.forEach((widget, index) => {
      widgetList.push(
        <div key={index} className={`column ${gridClass}`}>
          <Widget widget={widget} filters={filters} />
        </div>
      );
    });
    return widgetList;
  }

  render() {
    const widgetList = this.getWidgets();
    return (
      <div className="c-widget-list">
        {this.props.loading ?
          <Spinner isLoading={this.props.loading} /> :
          <div className="row collapse">
            {widgetList}
          </div>
        }
      </div>
    );
  }
}

WidgetList.propTypes = {
  grid: React.PropTypes.string,
  // STORE
  loading: React.PropTypes.bool,
  filters: React.PropTypes.object,
  // SELECTOR
  widgetsActive: React.PropTypes.array
};

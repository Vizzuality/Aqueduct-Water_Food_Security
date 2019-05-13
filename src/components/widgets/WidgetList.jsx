
// TO-DO: replace with widget-list and remove
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import Widget from 'components/widgets/Widget';
import { Spinner } from 'aqueduct-components';

export default class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  shouldComponentUpdate(nextProps) {
    const { widget: nextWidgetsActive, filters: nextFilters } = nextProps;
    const { widgetsActive, filters } = this.props;
    if (
      !isEqual(nextWidgetsActive, widgetsActive) ||
      !isEqual(nextFilters, filters)
    ) {
      return true;
    }

    return false;
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
        <div key={widget.id} className={`column ${gridClass}`}>
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
  grid: PropTypes.string,
  // STORE
  loading: PropTypes.bool,
  filters: PropTypes.object,
  // SELECTOR
  widgetsActive: PropTypes.array
};

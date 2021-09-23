import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Widget from 'components/widgets/widget';

class WidgetList extends PureComponent {
  render() {
    const { grid, widgets, filters } = this.props;
    const gridClass = classnames('column', {
      'small-12': !grid,
      [grid]: !!grid
    });

    // sort widgets based on above order
    const widgetIdsInOrder = [
      "80aaae51-4dec-4106-a9e6-6e4d75f50e3b",
      "0e36599c-d224-430f-bde7-40259edba4b3",
      "a3cd3647-03b8-4fc4-92d4-3370fab136f1",
      "a29ca8d2-1c86-4363-af11-c357115a9cd3",
      "1775b365-7d3a-4430-bc03-db2b734f0101",
      "468a919a-d4ae-403a-8b0c-33da209a41e1",
      "21630913-9f3f-4e43-9188-a8302f07f498",
      "fec1f0ec-7296-4efb-8ba9-40783ef51070"
    ]
    widgets.sort((a,b) => widgetIdsInOrder.indexOf(a.id) - widgetIdsInOrder.indexOf(b.id) )
    return (
      <div className="c-widget-list">
        <div className="row collapse">
          {widgets.map(widget => (
            <div
              key={widget.id}
              className={gridClass}
            >
              <Widget
                widget={widget}
                filters={filters}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

WidgetList.propTypes = {
  grid: PropTypes.string,
  filters: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired
};

WidgetList.defaultProps = { grid: null };

export default WidgetList;

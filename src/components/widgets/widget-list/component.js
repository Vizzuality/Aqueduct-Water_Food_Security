import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Widget from 'components/widgets/Widget';

class WidgetList extends PureComponent {
  render() {
    const { grid, widgets, filters } = this.props;
    const gridClass = classnames('column', {
      'small-12': !grid,
      [grid]: !!grid
    });

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

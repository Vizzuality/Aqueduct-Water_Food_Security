import React from 'react';
import PropTypes from 'prop-types';

import TableHeaderActions from './TableHeaderActions';

export default class TableHeader extends React.Component {
  render() {
    const { actions, columns, columnValues, columnQueries, filteredData, onFilter, onSort } = this.props;
    return (
      <thead>
        <tr>
          {(actions.showable || actions.editable || actions.removable) && !!filteredData.length &&
            <th />
          }
          {columns.map((c, index) => {
            return (
              <th key={index}>
                <span className="th-wrapper">
                  <span>{c.label}</span>

                  <TableHeaderActions
                    field={c.value}
                    values={columnValues[c.value]}
                    selected={columnQueries[c.value]}
                    onFilter={onFilter}
                    onSort={onSort}
                  />
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  actions: PropTypes.object,
  columns: PropTypes.array,
  columnValues: PropTypes.object,
  columnQueries: PropTypes.object,
  filteredData: PropTypes.array,
  onFilter: PropTypes.func,
  onSort: PropTypes.func
};

TableHeader.defaultProps = {
  columns: [],
  columnValues: {},
  columnQueries: {},
  filteredData: [],
  onFilter: null,
  onSort: null
};

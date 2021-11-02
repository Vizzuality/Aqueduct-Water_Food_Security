import React from 'react';
import PropTypes from 'prop-types';
import TableFilters from './TableFilters';
import TableSorts from './TableSorts';

export default class TableHeaderActions extends React.Component {
  render() {
    return (
      <div className="c-table-header-actions">
        <ul>
          <li>
            <TableSorts {...this.props} />
          </li>
          <li>
            <TableFilters {...this.props} />
          </li>
        </ul>
      </div>
    );
  }
}

TableHeaderActions.propTypes = {
  field: PropTypes.string.isRequired,
  values: PropTypes.array,
  selected: PropTypes.array,
  onFilter: PropTypes.func,
  onSort: PropTypes.func
};

TableHeaderActions.defaultProps = {
  onChange: null,
  selected: null
};

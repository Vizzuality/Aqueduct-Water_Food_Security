import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Icon } from 'aqueduct-components';

export default class TableContent extends React.Component {

  getPageBounds() {
    const { pagination } = this.props;

    return {
      bottom: pagination.page * pagination.pageSize,
      top: (pagination.page * pagination.pageSize) + pagination.pageSize
    };
  }

  render() {
    const { actions, columns, sort, rowSelection, onRowDelete } = this.props;
    const { bottom, top } = this.getPageBounds();

    let data = this.props.filteredData;

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length}>No results found</td>
          </tr>
        </tbody>
      );
    }

    /* Apply sorting to data */
    if (!isEmpty(sort)) {
      data = data.slice().sort((rowA, rowB) => {
        return rowA[sort.field].toString().toLowerCase() > rowB[sort.field].toString().toLowerCase() ? sort.value : (sort.value * -1);
      });
    }

    /* Apply pagination to data */
    data = data.slice(bottom, top);

    return (
      <tbody>
        {data.map((row, index) => {
          const selectedClass = classnames({ '-selected': rowSelection.includes(index) });

          return (
            <tr
              className={`${selectedClass}`}
              onClick={() => this.props.onToggleSelectedRow(row, index)}
              key={index}
            >
              {(actions.showable || actions.editable || actions.removable) &&
                <td>
                  {actions.removable &&
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowDelete(row, index);
                      }}
                      className="remove-row-btn"
                    >
                      <Icon name="icon-cross" className="-small" />
                    </button>
                  }
                </td>
              }
              {columns.map((col, i) =>
                <td key={i}>{row[col.value]}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

TableContent.propTypes = {
  actions: PropTypes.object,
  columns: PropTypes.array,
  filteredData: PropTypes.array,
  pagination: PropTypes.object,
  rowSelection: PropTypes.array,
  sort: PropTypes.object,
  onRowDelete: PropTypes.func,
  onToggleSelectedRow: PropTypes.func
};

TableContent.defaultProps = {
  actions: {},
  columns: [],
  filteredData: [],
  pagination: {},
  rowSelection: [],
  sort: {},
  onRowDelete: null,
  onToggleSelectedRow: null
};

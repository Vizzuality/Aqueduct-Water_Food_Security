import React from 'react';
import PropTypes from 'prop-types';

export default class TableFooter extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.onPrevPage = this.onPrevPage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
  }

  onNextPage() {
    if (this.props.pagination.page === this.props.pagination.total - 1) return;
    this.props.onChangePage && this.props.onChangePage(this.props.pagination.page + 1);
  }

  onPrevPage() {
    if (this.props.pagination.page === 0) return;
    this.props.onChangePage && this.props.onChangePage(this.props.pagination.page - 1);
  }

  render() {
    const { pagination } = this.props;
    return (
      <div className="table-footer">
        {/* Paginator */}
        {pagination.enabled &&
          <ul className="paginator">
            <li className="paginator-link">
              <button className="paginator-btn" onClick={this.onPrevPage}>
                Prev
              </button>
            </li>
            <li className="paginator-link">
              <button className="paginator-btn" onClick={this.onNextPage}>
                Next
              </button>
            </li>
          </ul>
        }

        {/* Page locator */}
        {pagination.enabled &&
          <span>Page <span>{pagination.page + 1}</span> of <span>{pagination.total}</span></span>
        }
      </div>
    );
  }
}

TableFooter.propTypes = {
  pagination: PropTypes.object,
  onChangePage: PropTypes.func
};

TableFooter.defaultProps = {
  pagination: {
    enabled: true,
    pageSize: 20,
    page: 0,
    total: null
  },
  onPrevPage: null,
  onNextPage: null
};

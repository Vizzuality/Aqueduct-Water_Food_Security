import { connect } from 'react-redux';
import Filters from 'components/app/Filters';
import { setFilters, setScopeFilter } from 'actions/filters';
import { updateUrl } from 'actions/url';

const mapStateToProps = ({ filters, datasets }) => ({
  filters,
  datasets
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateUrl());
  },

  setScopeFilter: (params) => {
    dispatch(setScopeFilter(params));
    dispatch(updateUrl());
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

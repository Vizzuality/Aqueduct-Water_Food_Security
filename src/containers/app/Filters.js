import { connect } from 'react-redux';
import Filters from 'components/app/Filters';
import { setFilters, setScopeFilter } from 'actions/filters';
import { updateMapUrl } from 'actions/url';

const mapStateToProps = ({ filters, datasets }) => ({
  filters,
  datasets
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateMapUrl());
  },

  setScopeFilter: (params) => {
    dispatch(setScopeFilter(params));
    dispatch(updateMapUrl());
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

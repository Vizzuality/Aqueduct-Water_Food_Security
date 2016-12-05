import { connect } from 'react-redux';
import Filters from 'components/filters/Filters';
import { setFilters } from 'actions/filters';
import { updateMapUrl } from 'actions/url';

const mapStateToProps = ({ filters }) => ({
  filters
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

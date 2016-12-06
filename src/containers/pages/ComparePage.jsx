import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';
import { setFilters } from 'actions/compare';

const mapStateToProps = ({ compare, datasets }) => ({
  compare,
  datasets
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    console.info(dispatch, params);
    dispatch(setFilters(params));
    // dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

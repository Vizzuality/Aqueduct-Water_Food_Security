import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';
import { setCompareFilters } from 'actions/compare';
import { updateCompareUrl } from 'actions/url';

const mapStateToProps = ({ compare, datasets }) => ({
  compare,
  datasets
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setCompareFilters(params));
    dispatch(updateCompareUrl());
  },
  updateCompareUrl: () => {
    dispatch(updateCompareUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

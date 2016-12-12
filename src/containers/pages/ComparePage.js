import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';
import { setCompareFilters, setCompareCountry } from 'actions/compare';
import { updateCompareUrl } from 'actions/url';

const mapStateToProps = ({ compare, datasets, countries }) => ({
  compare,
  datasets,
  countries
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setCompareFilters(params));
    dispatch(updateCompareUrl());
  },
  updateCompareUrl: () => {
    dispatch(updateCompareUrl());
  },
  setCompareCountry: (country) => {
    dispatch(setCompareCountry(country));
    dispatch(updateCompareUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

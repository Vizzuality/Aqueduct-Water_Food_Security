import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';
import { setCompareCountry } from 'actions/compare';
import { setFilters } from 'actions/filters';
import { updateCompareUrl } from 'actions/url';

const mapStateToProps = ({ compare, datasets, countries, filters }) => ({
  compare,
  filters,
  datasets,
  countries
});

const mapDispatchToProps = dispatch => ({
  setFilters: (params) => {
    dispatch(setFilters(params));
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

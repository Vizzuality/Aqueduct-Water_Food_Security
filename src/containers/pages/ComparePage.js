import { connect } from 'react-redux';
import ComparePage from 'components/pages/Compare/ComparePage';
import { setCompareCountry, emptyCompareCountries } from 'actions/compare';
import { setFilters } from 'actions/filters';
import { updateCompareUrl } from 'actions/url';
import getActiveWidgets from 'selectors/widgets_active';


const mapStateToProps = state => ({
  compare: state.compare,
  filters: state.filters,
  loading: state.datasets.loading,
  countries: state.countries,
  widgetsActive: getActiveWidgets(state)
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
  },
  emptyCompareCountries: () => {
    dispatch(emptyCompareCountries());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

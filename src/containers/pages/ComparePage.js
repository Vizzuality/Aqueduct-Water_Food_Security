import { connect } from 'react-redux';
import ComparePage from 'components/pages/Compare/ComparePage';
import { setCompareCountry, emptyCompareCountries } from 'actions/compare';
import { setFilters } from 'actions/filters';
import { updateCompareUrl } from 'actions/url';
import { toggleModal } from 'actions/modal';
import getActiveWidgets from 'selectors/widgets_active';
import getActiveLayers from 'selectors/layers_active';


const mapStateToProps = state => ({
  compare: state.compare,
  filters: state.filters,
  loding: state.datasets.loading,
  countries: state.countries,
  widgetsActive: getActiveWidgets(state),
  layersActive: getActiveLayers(state)
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
  },
  toggleModal: (opened, opts) => {
    dispatch(toggleModal(opened, opts));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

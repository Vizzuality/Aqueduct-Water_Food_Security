import { connect } from 'react-redux';
import MapPage from 'components/pages/MapPage';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { updateMapUrl } from 'actions/url';
import getActiveLayers from 'selectors/layers_active';

const mapStateToProps = state => ({
  mapConfig: state.map,
  filters: state.filters,
  layers: state.layers,
  layersActive: getActiveLayers(state),
  countries: state.countries
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  },
  updateMapUrl: () => {
    dispatch(updateMapUrl());
  },
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

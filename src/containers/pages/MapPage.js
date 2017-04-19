import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { updateMapUrl } from 'actions/url';
import getActiveLayers from 'selectors/layers_active';
import getActiveWidgets from 'selectors/widgets_active';

const mapStateToProps = state => ({
  mapConfig: state.map,
  filters: state.filters,
  countries: state.countries,
  sidebar: state.sidebar,
  layersActive: getActiveLayers(state),
  widgetsActive: getActiveWidgets(state)
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

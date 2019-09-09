import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapLocation } from 'actions/map';

// selectors
import {
  parseMapState,
  getBasemap,
  getActiveLayers,
  getFoodLayers,
  getCountryBounds,
  getLayerGroup
} from './selectors';

// component
import Map from './component';

export default connect(
  state => ({
    mapState: parseMapState(state),
    basemap: getBasemap(state),
    bounds: getCountryBounds(state),
    layers: getActiveLayers(state),
    layerGroup: getLayerGroup(state),
    foodLayers: getFoodLayers(state),
    countries: state.countries.list,
    filters: state.filters
  }),
  {
    setMapLocation,
    toggleModal
  }
)(Map);

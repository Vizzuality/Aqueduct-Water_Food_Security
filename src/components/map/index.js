import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapLocation, setLayerParametrization } from 'actions/map';

// selectors
import {
  parseMapState,
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
    bounds: getCountryBounds(state),
    layers: getActiveLayers(state),
    layerGroup: getLayerGroup(state),
    foodLayers: getFoodLayers(state),
    countries: state.countries.list,
    filters: state.filters
  }),
  {
    setMapLocation,
    setLayerParametrization,
    toggleModal
  }
)(Map);

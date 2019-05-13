import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapLocation } from 'actions/map';

// selectors
import {
  parseMapState,
  getActiveLayers,
  getFoodLayers
} from './selectors';

// component
import Map from './component';

export default connect(
  state => ({
    mapState: parseMapState(state),
    layers: getActiveLayers(state),
    foodLayers: getFoodLayers(state),
    countries: state.countries.list,
    filters: state.filters
  }),
  {
    setMapLocation,
    toggleModal
  }
)(Map);

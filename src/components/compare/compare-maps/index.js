import { connect } from 'react-redux';

// selectors
import { getFoodLayers, getActiveLayers } from 'components/map/selectors';
import { getCompareConfig } from './selectors';

// component
import CompareMaps from './component';

export default connect(
  state => ({
    compareConfig: getCompareConfig(state),
    layers: getActiveLayers(state),
    foodLayers: getFoodLayers(state),
    filters: state.filters
  }),
  null
)(CompareMaps);

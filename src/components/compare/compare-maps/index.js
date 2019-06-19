import { connect } from 'react-redux';

// selectors
import { getCompareConfig, getLayers } from './selectors';

// component
import CompareMaps from './component';

export default connect(
  state => ({
    compareConfig: getCompareConfig(state),
    layers: getLayers(state),
    countries: state.countries.list,
    filters: state.filters
  }),
  null
)(CompareMaps);

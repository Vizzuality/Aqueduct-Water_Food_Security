import { connect } from 'react-redux';

// selectors
// import getActiveWidgets from 'selectors/widgets_active';
// import getActiveLayers from 'selectors/layers_active';
import { getCompareConfig } from './selectors';
// component
import CompareMaps from './component';

export default connect(
  state => ({
    compareConfig: getCompareConfig(state)
    // compare: state.compare,
    // filters: state.filters,
    // countries: state.countries.list,
    // widgetsActive: getActiveWidgets(state),
    // layersActive: getActiveLayers(state)
  }),
  null
)(CompareMaps);

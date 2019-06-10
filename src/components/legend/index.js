import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// selectors
import getActiveLayers from 'selectors/layers_active';

// component
import LegendMobile from './component';

export default connect(
  state => ({
    layersActive: getActiveLayers(state),
    filters: state.filters
  }),
  { toggleModal }
)(LegendMobile);

import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// selectors
import { getActiveLayers } from 'components/map/selectors';

// component
import LegendMobile from './component';

export default connect(
  state => ({
    layersActive: getActiveLayers(state),
    filters: state.filters
  }),
  { toggleModal }
)(LegendMobile);

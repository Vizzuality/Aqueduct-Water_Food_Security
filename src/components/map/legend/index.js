import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// selectors
import { getLayers } from './selectors';

// component
import Legend from './component';

export default connect(
  state => ({
    layers: getLayers(state),
    filters: state.filters
  }),
  { toggleModal }
)(Legend);

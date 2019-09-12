import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// component
import Legend from './component';

export default connect(
  state => ({ filters: state.filters }),
  { toggleModal }
)(Legend);

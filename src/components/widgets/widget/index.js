import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// component
import Widget from './component';

export default connect(
  null,
  { toggleModal }
)(Widget);

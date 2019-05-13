import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// component
import DownloadMapControl from './component';

export default connect(
  null,
  { toggleModal }
)(DownloadMapControl);

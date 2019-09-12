import { connect } from 'react-redux';
import { ShareModal } from 'aqueduct-components';

// actions
import { getShareUrl } from 'reducers/share';

export default connect(
  state => ({ share: state.share }),
  { getShareUrl }
)(ShareModal);

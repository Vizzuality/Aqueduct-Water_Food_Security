import { connect } from 'react-redux';

// selectors
import { getCompareConfig } from './selectors';

// component
import CompareSummaries from './component';

export default connect(
  state => ({ compareConfig: getCompareConfig(state) }),
  null
)(CompareSummaries);

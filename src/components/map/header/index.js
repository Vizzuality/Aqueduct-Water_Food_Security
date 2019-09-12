import { connect } from 'react-redux';

// selectors
import { getDictionary } from './selectors';

// component
import MapHeader from './component';

export default connect(
  state => ({
    dictionary: getDictionary(state),
    filters: state.filters
  }),
  null
)(MapHeader);

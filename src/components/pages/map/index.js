import { connect } from 'react-redux';

// actions
import { updateMapUrl } from 'actions/url';

// component
import MapPage from './component';

export default connect(
  state => ({
    mapState: state.map,
    filters: state.filters
  }),
  { updateMapUrl }
)(MapPage);

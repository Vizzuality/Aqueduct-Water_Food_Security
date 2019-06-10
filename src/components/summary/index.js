import { connect } from 'react-redux';

// selectors
import { getCountryName } from './selectors';

// component
import Summary from './component';

export default connect(
  state => ({
    countryName: getCountryName(state),
    filters: state.filters
  }),
  null
)(Summary);

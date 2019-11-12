import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';

// selectors
import { getCountryName } from './selectors';

// component
import Summary from './component';

export default connect(
  state => ({
    countryName: getCountryName(state),
    filters: state.filters
  }),
  { toggleModal }
)(Summary);

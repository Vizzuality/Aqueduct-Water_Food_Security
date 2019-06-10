import { connect } from 'react-redux';
import { CountrySelect } from 'aqueduct-components';

export default connect(
  state => ({ countries: state.countries }),
  null
)(CountrySelect);

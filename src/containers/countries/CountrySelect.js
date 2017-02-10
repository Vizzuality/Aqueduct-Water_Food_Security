import { CountrySelect } from 'aqueduct-components';
import { connect } from 'react-redux';

const mapStateToProps = ({ countries }) => ({
  countries
});

export default connect(mapStateToProps, null)(CountrySelect);

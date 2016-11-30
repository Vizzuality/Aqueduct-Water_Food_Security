import { connect } from 'react-redux';
import CountrySelect from 'components/app/CountrySelect';

const mapStateToProps = ({ countries }) => ({
  countries
});

export default connect(mapStateToProps, null)(CountrySelect);

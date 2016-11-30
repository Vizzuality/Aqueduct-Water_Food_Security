import { connect } from 'react-redux';
import App from 'components/pages/App';
import { getCountries } from 'actions/countries';

export default connect(null, {
  getCountries
})(App);

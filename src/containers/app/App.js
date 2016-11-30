import { connect } from 'react-redux';
import App from 'components/app/App';
import { getCountries } from 'actions/countries';
import { getDatasets } from 'actions/datasets';

export default connect(null, {
  getDatasets,
  getCountries
})(App);

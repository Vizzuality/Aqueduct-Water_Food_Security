import { connect } from 'react-redux';
import App from 'components/app/App';
import { getCountries } from 'actions/countries';
import { getDatasets } from 'actions/datasets';
import { getLayers } from 'actions/layers';

export default connect(null, {
  getDatasets,
  getLayers,
  getCountries
})(App);

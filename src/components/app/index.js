import { connect } from 'react-redux';

// actions
import { getCountries } from 'actions/countries';
import { getDatasets } from 'actions/datasets';

// components
import App from './component';

export default connect(
  null,
  {
    getDatasets,
    getCountries
  }
)(App);

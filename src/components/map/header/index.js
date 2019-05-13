import { connect } from 'react-redux';

// component
import MapHeader from './component';

export default connect(
  state => ({
    filters: state.filters,
    countries: state.countries.list
  }),
  null
)(MapHeader);

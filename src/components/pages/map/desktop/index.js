import { connect } from 'react-redux';

// component
import MapPageDesktop from './component';

export default connect(
  state => ({
    filters: state.filters,
    countries: state.countries.list
  }),
  null
)(MapPageDesktop);

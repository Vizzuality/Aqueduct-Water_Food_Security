import { connect } from 'react-redux';

// component
import Analyzer from './component';

export default connect(
  state => ({
    filters: state.filters,
  }),
  null
)(Analyzer);
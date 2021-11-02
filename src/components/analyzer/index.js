import { connect } from 'react-redux';

// actions
import { setFilters } from 'actions/filters';

// component
import Analyzer from './component';

export default connect(
  state => ({
    filters: state.filters,
  }),
  {
    setFilters
  }
)(Analyzer);
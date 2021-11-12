import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'actions/filters';

// component
import Analyzer from './component';

export default connect(
  state => ({
    filters: state.filters,
  }),
  {
    toggleModal,
    setFilters,
  }
)(Analyzer);
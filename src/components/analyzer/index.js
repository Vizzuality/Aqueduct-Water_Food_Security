import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'actions/filters';
import { setAnalysis } from 'actions/analysis';

// component
import Analyzer from './component';

export default connect(
  state => ({
    filters: state.filters,
    analysis: state.analysis,
  }),
  {
    toggleModal,
    setFilters,
    setAnalysis,
  }
)(Analyzer);
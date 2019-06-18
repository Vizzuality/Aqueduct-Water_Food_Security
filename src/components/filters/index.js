import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'actions/filters';

// selectors
import { getWaterOptions, getTimelineOptions } from './selectors';

// component
import Filters from './component';

export default connect(
  state => ({
    filters: state.filters,
    waterOptions: getWaterOptions(state),
    yearOptions: getTimelineOptions(state)
  }),
  {
    toggleModal,
    setFilters
  }
)(Filters);

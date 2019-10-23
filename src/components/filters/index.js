import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters, resetFilters } from 'actions/filters';
import { setLayerParametrization } from 'actions/map';

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
    setFilters,
    resetFilters,
    setLayerParametrization
  }
)(Filters);

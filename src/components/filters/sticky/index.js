import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setCompareCountry } from 'actions/compare';
import { setFilters } from 'actions/filters';

// selectors
import { getWaterOptions } from '../selectors';
import { isTimeFrameDisabled } from './selectors';

// component
import StickyFilters from './component';

export default connect(
  state => ({
    filters: state.filters,
    waterOptions: getWaterOptions(state),
    isTimeFrameDisabled: isTimeFrameDisabled(state)
  }),
  {
    toggleModal,
    setCompareCountry,
    setFilters
  }
)(StickyFilters);

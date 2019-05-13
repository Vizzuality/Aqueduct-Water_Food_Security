import * as Cookies from 'js-cookie';
import { toastr } from 'react-redux-toastr';

// constants
import { SET_FILTERS } from 'constants/filters';
import { MESSAGES } from 'constants/messages';
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS
} from 'constants/water-indicators';

export function setFilters(filters) {
  return (dispatch, getState) => {
    const { filters: { year } } = getState();

    const waterIndicators = year === 'baseline' ? BASELINE_WATER_INDICATORS : PROJECTED_WATER_INDICATORS;

    // TO-DO: move away. WARNING
    const newFilters = Object.assign({}, getState().filters, filters);
    const nextWaterIndicator = waterIndicators.find(w => w.value === newFilters.indicator);
    const { warning } = nextWaterIndicator || {};

    if (warning) {
      if (!Cookies.get(`${newFilters.indicator}-${warning}`) && newFilters.irrigation === 'rainfed') {
        toastr.warning(MESSAGES[warning]);
        Cookies.set(`${newFilters.indicator}-${warning}`, true);
      }
    }

    dispatch({
      type: SET_FILTERS,
      payload: filters
    });
  };
}

export default { setFilters };

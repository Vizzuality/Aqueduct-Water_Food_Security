import { SET_FILTERS } from 'constants/filters';
// Services
import * as Cookies from "js-cookie";
import { toastr } from 'react-redux-toastr';

// Constants
import { WATER_OPTIONS } from 'constants/filters';
import { MESSAGES } from 'constants/messages';

export function setFilters(filters) {
  return (dispatch, getState) => {
    // WARNING
    const newFilters = Object.assign({}, getState().filters, filters);
    const warning =  WATER_OPTIONS.find(w => w.value === newFilters.indicator).warning;

    if (!Cookies.get(`${newFilters.indicator}-${warning}`) && newFilters.irrigation === 'rainfed' && !!warning) {
      toastr.warning(MESSAGES[warning]);
      Cookies.set(`${newFilters.indicator}-${warning}`, true);
    }

    dispatch({
      type: SET_FILTERS,
      payload: filters
    })
  };
}

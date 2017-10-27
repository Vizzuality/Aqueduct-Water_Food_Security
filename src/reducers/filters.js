import { SET_FILTERS } from 'constants/filters';

// Services
import { toastr } from 'react-redux-toastr';

// Constants
import { WATER_OPTIONS } from 'constants/filters';
import { MESSAGES } from 'constants/messages';

const initialState = {
  page: '',
  crop: 'all',
  scope: 'global',
  country: undefined,
  countryName: undefined,
  period: 'year',
  period_value: 'baseline',
  year: 'baseline',
  food: 'none',
  indicator: 'none',
  irrigation: 'all',
  type: 'absolute'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      const newState = Object.assign({}, state, action.payload);
      return newState
    }
    default:
      return state;
  }
}

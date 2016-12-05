import { SET_FILTERS } from 'constants/filters';

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters
  };
}

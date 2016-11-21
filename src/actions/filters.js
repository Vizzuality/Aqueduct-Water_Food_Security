export const SET_FILTERS = 'SET_FILTERS';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters
  };
}

export function setCurrentFilter(current) {
  return {
    type: SET_CURRENT_FILTER,
    payload: current
  };
}

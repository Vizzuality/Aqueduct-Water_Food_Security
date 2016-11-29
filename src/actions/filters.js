export const SET_FILTERS = 'SET_FILTERS';
export const SET_TOTAL_FILTERS = 'SET_TOTAL_FILTERS';
export const SET_SCOPE_FILTER = 'SET_SCOPE_FILTER';

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters
  };
}

export function setTotalFilters(filters) {
  return {
    type: SET_TOTAL_FILTERS,
    payload: filters
  };
}

export function setScopeFilter(scope) {
  return {
    type: SET_SCOPE_FILTER,
    payload: scope
  };
}

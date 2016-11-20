import { SET_MAP_PARAMS } from 'constants/map';

export function panMaps(panParams) {
  return {
    type: SET_MAP_PARAMS,
    payload: panParams
  };
}

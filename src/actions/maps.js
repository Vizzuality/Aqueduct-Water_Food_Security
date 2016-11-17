import { MAP_UPDATE_PAN } from 'constants/map';

export function panMaps(panParams) {
  return {
    type: MAP_UPDATE_PAN,
    payload: panParams
  };
}

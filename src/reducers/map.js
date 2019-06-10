
import { MAP_OPTIONS } from 'components/map/constants';

const { center, zoom } = MAP_OPTIONS;

const initialState = {
  center,
  zoom
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MAP_LOCATION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

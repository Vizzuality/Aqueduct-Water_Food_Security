
import { MAP_OPTIONS } from 'components/map/constants';

const { center, zoom } = MAP_OPTIONS;

const initialState = {
  center,
  zoom,
  basemap: 'hydro',
  parametrization: { opacity: 1 }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MAP_LOCATION':
      return { ...state, ...action.payload };
    case 'SET_BASEMAP':
      return { ...state, basemap: action.payload };
    case 'SET_PARAMETRIZATION':
      return { ...state, parametrization: { ...state.parametrization, ...action.payload } };
    default:
      return state;
  }
}

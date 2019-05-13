
import { MAP_OPTIONS } from 'components/map/constants';
import { SET_MAP_LOCATION } from 'actions/map';

const { center, zoom } = MAP_OPTIONS;

const initialState = {
  center,
  zoom
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return {...state, ...action.payload };
    default:
      return state;
  }
}

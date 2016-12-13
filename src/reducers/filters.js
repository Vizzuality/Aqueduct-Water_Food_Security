import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: null,
  scenario: '24',
  year: 'bs',
  food: 'production',
  water: 'ws',
  irrigation: ['irrigated', 'rainfed'],
  query: {
    water: '',
    food: ''
  }
};

function getQuery({ crop, scope, country, scenario, year, food, water, irrigation }) {

  // Water query: {indicator code}{year code}{scenario code}{data type code}{sufix}
  // Food query: ???

  const indicator = water;
  const dataType = 'c';
  const sufix = 'r';
  const _scenario = year === 'baseline' ? '00' : scenario;

  return {
    query: {
      water: `${indicator}${year}${_scenario}${dataType}${sufix}`,
      food: ''
    }
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      const filters = Object.assign({}, state, action.payload);
      return Object.assign({}, state, action.payload, getQuery(filters));
    }
    default:
      return state;
  }
}

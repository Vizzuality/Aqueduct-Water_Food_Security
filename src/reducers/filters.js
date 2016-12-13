import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',            // {global|country}
  country: null,
  scenario: 'ssp2 rcp45',     // {optimistic|pesimistic|business}
  year: 'bs',
  food: 'production',         // {production|demand|trade}
  water: 'water-risk',        // {water-risk|ground}
  irrigation: ['irrigated', 'rainfed'],   // {irrigated|rainfed}, one value at least
  query: {
    water: '',
    food: ''
  }
};

function getQuery({ crop, scope, country, scenario, year, food, water, irrigation }) {
  return {
    query: {
      water: `${crop}${scope}${country}${scenario}${year}${food}${water}${irrigation}`,
      food: `${crop}${scope}${country}${scenario}${year}${food}${water}${irrigation}`
    }
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      const filters = Object.assign({}, state, action.payload);
      return Object.assign({}, state, getQuery(filters));
    }
    default:
      return state;
  }
}

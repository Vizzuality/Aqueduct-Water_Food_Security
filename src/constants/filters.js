import layerSpec from 'utils/layers/layers';

export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';

// FOOD OPTIONS
export const FOOD_OPTIONS = layerSpec.filter(layer => layer.category === 'food').map((layer) => {
  return {
    label: layer.name,
    value: layer.id,
    timeline: !!layer.timeline
  };
});

// Add 'none' option
FOOD_OPTIONS.push({
  label: 'None',
  value: 'none'
});

// SCOPE OPTIONS
export const SCOPE_OPTIONS = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

export const CATEGORIES = {
  water: 'Water risk',
  food: 'Food security',
  crop: 'Crops'
};

export const YEAR_OPTIONS = [
  { value: 'baseline', label: 'Baseline' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
];

export const DATA_TYPE_OPTIONS = [
  { label: 'Absolute value', value: 'absolute' },
  { label: 'Change from baseline', value: 'change_from_baseline' }
];

export default {
  FOOD_OPTIONS,
  SCOPE_OPTIONS,
  CATEGORIES,
  YEAR_OPTIONS,
  DATA_TYPE_OPTIONS
};

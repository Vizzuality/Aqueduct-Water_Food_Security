import layerSpec from 'utils/layers/layer_spec.json';

export const SET_FILTERS = 'SET_FILTERS';

// FOOD OPTIONS
export const FOOD_OPTIONS = layerSpec.filter(layer => layer.category === 'food').map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
FOOD_OPTIONS.push({
  label: 'None',
  value: 'none'
});

// WATER OPTIONS
export const WATER_OPTIONS = layerSpec.filter(layer => layer.category === 'water').map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
WATER_OPTIONS.push({
  label: 'None',
  value: 'none'
});

// SCOPE OPTIONS
export const SCOPE_OPTIONS = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

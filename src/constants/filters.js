import layerSpec from 'utils/layers/layer_spec.json';

export const SET_FILTERS = 'SET_FILTERS';

// FOOD OPTIONS
export const foodOptions = layerSpec.filter(layer => layer.category === 'food').map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
foodOptions.push({
  label: 'None',
  value: 'none'
});

// WATER OPTIONS
export const waterOptions = layerSpec.filter(layer => layer.category === 'water').map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
waterOptions.push({
  label: 'None',
  value: 'none'
});

// SCOPE OPTIONS
export const scopeOptions = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

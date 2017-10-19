import layerSpec from 'utils/layers/layer_spec.json';

export const SET_FILTERS = 'SET_FILTERS';

// FOOD OPTIONS
const FOOD_OPTIONS = layerSpec.filter(layer => layer.category === 'food').map((layer) => {
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

// WATER OPTIONS
const WATER_OPTIONS = layerSpec.filter(layer => layer.category === 'water').map((layer) => {
  return {
    label: layer.name,
    value: layer.id,
    warning: layer.warning,
    timeline: !!layer.timeline
  };
});


// Add 'none' option
WATER_OPTIONS.push({
  label: 'None',
  value: 'none'
});
console.log(WATER_OPTIONS);

// SCOPE OPTIONS
const SCOPE_OPTIONS = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

export { FOOD_OPTIONS, WATER_OPTIONS, SCOPE_OPTIONS };

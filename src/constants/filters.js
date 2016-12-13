import filter from 'lodash/filter';
import layerSpec from 'utils/layers/layer_spec.json';

export const SET_FILTERS = 'SET_FILTERS';

// Filter values
export const scenarioOptions = [
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pesimistic', label: 'Pesimistic' },
  { value: 'business', label: 'Business as usual' }
];

export const foodOptions = filter(layerSpec, { category: 'food' }).map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

export const waterOptions = filter(layerSpec, { category: 'water' }).map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

export const scopeOptions = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

export const yearOptions = [
  { value: 'baseline', label: 'Baseline (current)' },
  { value: '2020', label: '2020' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' },
  { value: '2050', label: '2050' }
];

export const cropOptions = [
  { value: 'all', label: 'All crops' },
  { value: 'rice', label: 'Rice' },
  { value: 'corn', label: 'Corn' },
  { value: 'soy', label: 'Soy' },
  { value: 'oat', label: 'Oat' }
];

export const irrigationOptions = [
  { value: 'irrigated', label: 'Irrigated' },
  { value: 'rainfed', label: 'Rainfed' }
];

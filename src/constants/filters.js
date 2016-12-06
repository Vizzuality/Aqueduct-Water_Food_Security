export const SET_FILTERS = 'SET_FILTERS';

// Filter ui values
export const predictionOptions = [
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pesimistic', label: 'Pesimistic' },
  { value: 'business', label: 'Business as usual' }
];
export const foodOptions = [
  { value: 'production', label: 'Production' },
  { value: 'demand', label: 'Demand' },
  { value: 'trade', label: 'Trade' }
];
export const waterOptions = [
  { value: 'water-risk', label: 'Water riks layer' },
  { value: 'ground', label: 'Ground layer' }
];
export const scopeOptions = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];
// Mocks
export const baselineOptions = [
  { value: 'current', label: 'Baseline (current)' },
  { value: '2010', label: '2010' },
  { value: '2020', label: '2020' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
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

export const DATASETS = [
  {
    id: 'd07bdbd4-2b86-48e4-bb08-31c0ffac4b1c',
    layerId: '9cc271e2-89bb-4854-975d-86b4cea0ff2f',
    name: 'Food demand for crop',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: '5e3b49b7-08e3-4c2f-9b9a-bd14f72c7879',
    layerId: '5dd373d7-08f7-481b-813f-bf476d8e41f5',
    name: 'Total crop production',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: 'acf126ae-39bc-4085-a8ca-2a9287636713',
    layerId: '25bb1a31-70ae-4f93-b8ae-6eee7bd04df7',
    name: 'Crop net trade',
    category: 'food',
    timeline: true,
    layerOptions: {
      dataManipulator: (data = []) => {
        const sortFunction = (a, b) => {
          if (a.properties.value < b.properties.value) return 1;
          if (a.properties.value > b.properties.value) return -1;
          return 0;
        };
        const sortedData = data.sort(sortFunction);
        const firstFive = sortedData.slice(0, 5);
        const lastFive = sortedData.slice(Math.max(sortedData.length - 5, 1));

        return [...firstFive, ...lastFive];
      }
    }
  },
  {
    id: '110f25ae-0525-404d-b305-fa5cce609ccd',
    layerId: '8360bffe-75ee-4eea-ab33-143d9e1003f5',
    name: 'Kilocalories per person',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'asc'
    }
  },
  {
    id: 'ee0aefe6-176e-43e7-b349-b44b70d95d22',
    layerId: '8b8c9f05-0cfe-4c82-ba91-1b4e8d7c9942',
    name: 'Population at risk of hunger',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  // baseline water
  {
    id: 'f0559cb4-320c-4f69-a62f-e1595623806f',
    name: 'Water stress',
    category: 'water',
    family: 'baseline'
  },
  // projected water
  {
    id: 'c6569326-2deb-4cdb-9c3e-16e1ce549f2a',
    name: 'Projected Water stress',
    category: 'water',
    family: 'projected'
  },
  // country mask
  {
    id: 'e844accd-9e65-414b-84e7-efc5bd65aa17',
    layerId: '87e294b1-80fe-4ddc-baac-d2e2e28d9894',
    name: 'Country mask',
    category: 'mask'
  },
  // all crops / one crop
  {
    id: 'a57a457a-cee7-44a6-af0a-5c27176e0ec0',
    layerId: 'a57a457a-cee7-44a6-af0a-5c27176e0ec0',
    name: 'All crops',
    category: 'crop'
  }
];

export const FOOD_LAYERS = DATASETS.filter(_dataset => _dataset.category === 'food').map(_dataset => _dataset.layerId);
export const WATER_SPECS = DATASETS.filter(_dataset => _dataset.category === 'water').reduce((accumulator, nextValue) => ({
  ...accumulator,
  [nextValue.family]: nextValue.id
}), {});

export default DATASETS;

export const DATASETS = [
  {
    id: '6880e51c-fda2-4de5-8456-e981d548853a',
    layerId: 'e41613c3-32ee-45e9-b3fe-8685b289cb8e',
    name: 'Food demand for crop',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: 'b6864a7c-4711-4fd1-9e39-3eb3b36761bf',
    layerId: 'c1a06eab-84f5-47ce-97f0-fbb9f650a2be',
    name: 'Total crop production',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: 'cfbe4903-2aaa-47e1-b26b-70a600363f5b',
    layerId: '3a0eae9d-eb02-478c-8997-c8e29ce69db0',
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
    id: 'c6d487f0-42ad-4513-ac99-108d4c51dab1',
    layerId: 'bd4a831a-e43b-429b-9eb3-593176718812',
    name: 'Kilocalories per person',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'asc'
    }
  },
  {
    id: '57748f05-aa1d-476f-9044-9ae9ca8a09c5',
    layerId: '91659d99-2160-4f80-9475-06e0ddbba862',
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
    id: '113258c9-14fc-4624-8b5c-76b064ac1ae9',
    name: 'Water Risk',
    category: 'water',
    family: 'baseline'
  },
  // projected water
  {
    id: '3cca5144-63d2-4ddb-af53-094603b702f3',
    name: 'Projected Water Risk',
    category: 'water',
    family: 'projected'
  },
  // country mask
  {
    id: 'ea9dacf1-c11e-4e6a-ad63-8804111a75ba',
    layerId: '533e0d69-8bb5-45c0-a036-642bf7b977df',
    name: 'Country mask',
    category: 'mask'
  },
  // all crops / one crop
  {
    id: '4a2b250e-25ab-4da3-9b83-dc318995eee1',
    layerId: '4a2b250e-25ab-4da3-9b83-dc318995eee1',
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

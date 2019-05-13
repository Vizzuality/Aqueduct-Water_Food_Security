export const DATASETS = [
  {
    id: '4659c249-7524-47bf-92eb-05ba196dedda',
    layerId: '9d5850be-e026-4e34-b043-78d90082215f',
    name: 'Food demand for crop',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: '0eb7ef57-037b-4356-8902-04a39cf4bd24',
    layerId: 'efafaa9f-37ec-4f51-be7d-999f58e6823b',
    name: 'Total crop production',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'desc'
    }
  },
  {
    id: 'bc60a695-ab95-4264-8058-bd61d13c4918',
    layerId: 'b8e135d2-b64f-4ea3-93e9-9f8d1245fb2a',
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
    id: 'ccdaede2-5343-49d6-8ea9-769528c3ab92',
    layerId: 'c29b190b-6801-49ed-a101-6770525467c4',
    name: 'Kilocalories per person',
    category: 'food',
    timeline: true,
    layerOptions: {
      topSize: 10,
      sort: 'asc'
    }
  },
  {
    id: '1c9a1e4f-455b-4c03-ac88-dd2242a2e4b1',
    layerId: '63976c45-d991-4495-a318-45950912510a',
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
    name: 'Baseline Water stress',
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
  // // water datasets
  // {
  //   id: 'water-datasets',
  //   datasets: {
  //     baseline: 'f0559cb4-320c-4f69-a62f-e1595623806f',
  //     projected: 'c6569326-2deb-4cdb-9c3e-16e1ce549f2a'
  //   },
  //   name: 'Water stress',
  //   category: 'water',
  //   timeline: true,
  //   warning: 'not-rainfed-relevant'
  // },
  // {
  //   id: 'd9785282-2140-463f-a82d-f7296687055a',
  //   layerId: '58e85d31-a59f-416a-bd83-16a2c6e68c33',
  //   layerAbsoluteId: 'e35cdf8e-0601-477c-9a0d-8d4874d296a7',
  //   layerProjectedId: '83b9c999-22f3-4413-9793-5eb806630117',
  //   name: 'Seasonal variability',
  //   category: 'water',
  //   timeline: true
  // },
  // {
  //   id: 'bf657e60-de9c-4b7e-8736-d573d38e3ce1',
  //   layerId: 'db89786d-0862-44f7-8a21-9d21cd52ab15',
  //   name: 'Inter-annual variability',
  //   category: 'water'
  // },
  // {
  //   id: '9c450642-f976-40eb-96b4-0c904d519578',
  //   layerId: '39c5649f-aaf7-4d32-9493-26441d8f80f0',
  //   name: 'Drought severity (soil moisture)',
  //   category: 'water'
  // },
  // {
  //   id: 'b53ef8c5-8554-4a4a-a100-fdf5a022cb4e',
  //   layerId: 'a1007109-4462-43ac-8412-e1acc6c84174',
  //   name: 'Groundwater stress',
  //   category: 'water',
  //   warning: 'not-rainfed-relevant'
  // },
  // {
  //   id: 'cbd0d0f8-edf9-47bc-93ef-71c1a5e5fed7',
  //   layerId: '1c825957-f34f-4f49-8c19-20c952722ba9',
  //   name: 'Groundwater table declining trend',
  //   category: 'water',
  //   warning: 'not-rainfed-relevant'
  // },
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

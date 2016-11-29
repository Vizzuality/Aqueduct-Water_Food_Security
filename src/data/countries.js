import countries from 'data/countries.json';

const countryList = countries.features.map((item) => {
  return { value: item.id, label: item.properties.name };
}).sort((a, b) => {
  return a.label > b.label ? 1 : -1;
});

export default countryList;

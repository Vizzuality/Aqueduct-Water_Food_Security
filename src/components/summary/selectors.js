import { createSelector } from 'reselect';

// states
const getCountries = state => state.countries.list;
const getCountry = state => state.filters.country;

export const getCountryName = createSelector(
  [getCountries, getCountry],
  (_countries = {}, _country = []) => {
    if (!_countries.length || !_country) return '';

    const countryMatch = _countries.find(country => country.id === _country);

    if (!countryMatch) return '';

    return countryMatch.name;
  }
);

export default { getCountryName };

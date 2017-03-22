// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { setCompareCountry } from 'actions/compare';
import { setEmbed } from 'actions/embed';

export function onEnterMapPage({ location }, replace, done) {
  // TODO: this check is not as consistent as it should be. The right solution could be grouping all map params inside "map"
  // if there are map position params
  if (location.query.zoom) {
    const map = {
      zoom: +location.query.zoom,
      latLng: {
        lat: +location.query.lat,
        lng: +location.query.lng
      }
    };
    dispatch(setMapLocation(map));
  }

  // TODO: this check is not as consistent as it should be. The right solution could be grouping all filter params inside "filters"
  // if there are filter params
  // I really don't like this...
  if (location.query.crop) {
    const { crop, country, food, irrigation, scope, year, water, changeFromBaseline } = location.query;
    const filtersObj = {
      country,
      crop,
      food,
      irrigation: (irrigation) ? irrigation.split(',') : false,
      scope,
      year,
      water,
      changeFromBaseline: (changeFromBaseline === 'true')
    };
    dispatch(setFilters(filtersObj));
  }

  done();
}

export function onEnterComparePage({ location }, replace, done) {
  // If thera are country params
  if (location.query.countries) {
    const countries = location.query.countries.split(',');
    countries.forEach((c, i) => {
      dispatch(setCompareCountry({ iso: c, index: i }));
    });
  }
  // If there are filter params
  if (location.query.crop) {
    const { crop, food, year, water, changeFromBaseline } = location.query;
    let { irrigation } = location.query;
    irrigation = irrigation.split(',');
    const filtersObj = {
      crop,
      scope: 'country',
      year,
      food,
      water,
      irrigation,
      changeFromBaseline: (changeFromBaseline === 'true')
    };
    dispatch(setFilters(filtersObj));
  }
  done();
}

export function onEnterEmbedPage({ location }, replace, done) {
  if (location.query.state) {
    let state;
    try {
      state = JSON.parse(atob(location.query.state));
      dispatch(setFilters(state.filters));
      dispatch(setEmbed(state.embed));
    } catch (e) {} // eslint-disable-line no-empty
  }

  done();
}

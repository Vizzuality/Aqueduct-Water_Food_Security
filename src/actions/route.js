// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { setCompareCountry } from 'actions/compare';

export function onEnterMapPage({ location }, replace, done) {
  // TODO: this check is not as consistent as it should be. The right solution could be grouping al filter params inside "map"
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

  // TODO: this check is not as consistent as it should be. The right solution could be grouping al filter params inside "filters"
  // if there are filter params
  if (location.query.crop) {
    const { crop, scope, country, prediction, baseline, food, water } = location.query;
    let { irrigation } = location.query;
    irrigation = irrigation.split(',');
    const filtersObj = {
      crop,
      scope,
      country,
      prediction,
      baseline,
      food,
      water,
      irrigation
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
    const { crop, country, prediction, baseline, food, water } = location.query;
    let { irrigation } = location.query;
    irrigation = irrigation.split(',');
    const filtersObj = {
      crop,
      scope: 'global',
      country,
      prediction,
      baseline,
      food,
      water,
      irrigation
    };
    dispatch(setFilters(filtersObj));
  }
  done();
}

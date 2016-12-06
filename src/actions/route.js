// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { setCompareCountry } from 'actions/compare';

export function onEnterMapPage({ location }, replace, done) {
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
  const countries = location.query.countries ? location.query.countries.split(',') : [];
  countries.forEach((c, i) => {
    dispatch(setCompareCountry({ iso: c, index: i }));
  });
  done();
}

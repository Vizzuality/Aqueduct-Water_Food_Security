// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation, setLayerParametrization } from 'actions/map';
import { setFilters } from 'actions/filters';
import { setCompareCountry } from 'actions/compare';
import { setEmbed } from 'actions/embed';

export function onEnterMapPage({ location }, replace, done) {
  const { crop, country, food, irrigation, scope, subscope, period, period_value, year, indicator, type, zoom, threshold } = location.query;
  // TODO: this check is not as consistent as it should be. The right solution could be grouping all map params inside "map"
  // if there are map position params
  if (zoom) {
    const map = {
      zoom: +location.query.zoom,
      center: {
        lat: +location.query.lat,
        lng: +location.query.lng
      },
      ...location.query.basemap && { basemap: location.query.basemap }
    };
    dispatch(setMapLocation(map));
    if (location.query.opacity) dispatch(setLayerParametrization({ opacity: location.query.opacity }));
  }

  // TODO: this check is not as consistent as it should be. The right solution could be grouping all filter params inside "filters"
  // if there are filter params
  // I really don't like this...
  if (crop && period && year) {
    const filtersObj = {
      country,
      crop,
      food,
      irrigation,
      scope,
      subscope,
      period,
      period_value,
      year,
      indicator,
      threshold,
      type,
      iso: country,
      page: 'map'
    };
    dispatch(setFilters(filtersObj));
  } else {
    dispatch(setFilters({
      page: 'map'
    }));
  }

  done();
}

export function onEnterComparePage({ location }, replace, done) {
  const { crop, country, countries, food, irrigation, period, period_value, scope, year, indicator, type } = location.query;
  // If thera are country params
  if (countries) {
    countries.split(',').forEach((c, i) => {
      dispatch(setCompareCountry({ iso: c, index: i }));
    });
  }
  // If there are filter params
  if (crop && period && year) {
    const filtersObj = {
      crop,
      scope,
      period,
      period_value,
      year,
      food,
      indicator,
      irrigation,
      type,
      iso: country,
      page: 'compare'
    };
    dispatch(setFilters(filtersObj));
  } else {
    dispatch(setFilters({
      page: 'compare'
    }));
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

export function onEnterReportPage({ location }, replace, done) {
  if (location.query.zoom) {
    const map = {
      zoom: +location.query.zoom,
      center: {
        lat: +location.query.lat,
        lng: +location.query.lng
      }
    };
    dispatch(setMapLocation(map));
  }

  if (location.query.crop) {
    const { crop, country, food, irrigation, scope, period, period_value, year, indicator, type } = location.query;
    const filtersObj = {
      country,
      crop,
      food,
      irrigation,
      scope,
      period,
      period_value,
      year,
      indicator,
      type,
      iso: country,
      page: 'map'
    };
    dispatch(setFilters(filtersObj));
  }

  done();
}

// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';
import { setTotalFilters } from 'actions/filters';

export function onEnterAppPage({ location }, replace, done) {
  const map = {
    zoom: +location.query.zoom,
    latLng: {
      lat: +location.query.lat,
      lng: +location.query.lng
    }
  };

  const filters = location.query.filters ? JSON.parse(atob(location.query.filters)) : null;

  dispatch(setMapLocation(map));
  dispatch(setTotalFilters(filters));
  done();
}

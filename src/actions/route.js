// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';

export function updateMapParams({ location }, replace, done) {
  const config = {
    zoom: +location.query.zoom,
    latLng: {
      lat: +location.query.lat,
      lng: +location.query.lng
    }
  };
  dispatch(setMapLocation(config));
  done();
}

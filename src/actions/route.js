// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from 'main';
import { setMapLocation } from 'actions/map';


export function updateMapParams({ params }, replace, done) {
  const config = {
    zoom: params.zoom,
    latLng: {
      lat: params.lat,
      lng: params.lng
    }
  };
  dispatch(setMapLocation(config));
  done();
}

import { panMaps } from 'actions/maps';
// Route actions won't be dispatched inside connect, so dispatch funcion is needed
import { dispatch } from '../main';


export function updateParams({ params }, replace, done) {
  const mapSettings = {
    zoom: params.zoom,
    latLng: {
      lat: params.lat,
      lng: params.lng
    }
  };
  dispatch(panMaps(mapSettings));
  done();
}

import classnames from 'classnames';
import { format } from 'd3-format';

import { MARKER_LAYER } from 'components/map/constants';

const getSize = (properties) => {
  // const size = (properties.value < 1) ? 1 : properties.value;
  const size = (Math.abs(properties.value) < 1) ? 1 : Math.abs(properties.value);
  const multiplicator = 2.5;
  const constant = 50;
  const border = 10;

  return border + constant + (multiplicator * Math.log(size));
};

const getInfowWindow = properties => (
  `<div class="c-infowindow -no-iteraction">
    <h3>${properties.country}</h3>
  </div>`
);

const getMarkup = (value) => {
  const _value = format('.3s')(value);
  return (`
    <div class="marker-bubble-inner">
      ${_value}
    </div>
  `);
};

const getMarkersClass = (properties, layer) => {
  const { value } = properties;
  const isCropNetTrade = layer.id === '25bb1a31-70ae-4f93-b8ae-6eee7bd04df7';

  return classnames('c-marker-bubble', {
    '-positive': isCropNetTrade && value > 0,
    '-negative': isCropNetTrade && value < 0
  });
};

const getMarker = (geojson, layer) => {
  const { geometry, properties } = geojson;
  const divHtmlIcon = getMarkup(properties.value);
  const divHtmlInfowindow = getInfowWindow(properties);
  const bubbleSize = getSize(properties);
  const markerClass = getMarkersClass(properties, layer);

  const marker = L.marker(geometry.coordinates.reverse(), {
    icon: L.divIcon({
      iconSize: [bubbleSize, bubbleSize],
      className: markerClass,
      html: divHtmlIcon
    })
  });

  marker.bindPopup(divHtmlInfowindow);

  return marker;
};

export const getMarkerLayer = (geojson, layer) => ({
  ...MARKER_LAYER,
  id: `${MARKER_LAYER.id}-${new Date().getTime()}`,
  isMarkerLayer: true,
  layerConfig: {
    ...MARKER_LAYER.layerConfig,
    body: geojson.map(_geojson => getMarker(_geojson, layer))
  }
});

export default getMarkerLayer;

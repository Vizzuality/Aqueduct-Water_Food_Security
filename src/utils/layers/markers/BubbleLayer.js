/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
/* eslint class-methods-use-this: 0*/

import L from 'leaflet/dist/leaflet';
import find from 'lodash/find';
import { format } from 'd3-format';

/**
 * Creating buble marker layer for food layers
 * @param  {Array} geoJson
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleLayer {
  constructor(geoJson, params) {
    this.params = params;

    return L.geoJson(geoJson, {
      pointToLayer: (feature) => {
        // This should be given by the current filters
        const cropFilter = 'allcrops';
        const crops = feature.properties.crops;
        const cropSelected = find(crops, { slug: cropFilter });

        // Options
        const options = {
          location: feature.geometry.coordinates,
          className: 'c-marker-bubble',
          size: this._getSize(cropSelected.value),
          data: feature.properties
        };

        // Marker && infowindow html
        const divHtmlIcon = this._setMarkerHtml(cropSelected.value);
        const divHtmlInfowindow = this._setInfowindowHtml(options.data);

        const marker = L.marker(options.location.reverse(), {
          icon: L.divIcon({
            iconSize: [options.size, options.size],
            className: options.className,
            html: divHtmlIcon
          })
        });

        marker.bindPopup(divHtmlInfowindow);

        return marker;
      },

      onEachFeature: (feature, layer) => {
        layer
          .on('mouseover', function mouseover() {
            this.openPopup();
          })
          .on('mouseout', function mouseout() {
            this.closePopup();
          });
      }
    });
  }


  // STATIC methods
  // - _setMarkerHtml
  // - _setInfowindowHtml
  // - _getSize
  _setMarkerHtml(value) {
    const _value = format('.3s')(value);
    return (`
      <div class="marker-bubble-inner">
        ${_value}
      </div>
    `);
  }

  _setInfowindowHtml(properties) {
    return (`
      <div class="c-infowindow -no-iteraction">
        <h3>${properties.country}</h3>
      </div>`
    );
  }

  _getSize(v) {
    const size = (v < 1) ? 1 : v;
    const multiplicator = 2.5;
    const constant = 50;
    const border = 10;

    return border + constant + (multiplicator * Math.log(size));
  }
}

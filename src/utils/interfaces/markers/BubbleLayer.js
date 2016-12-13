/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import L from 'leaflet';
import { format } from 'd3-format';

/**
 * Creating buble marker layer for food layers
 * @param  {Array} data
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleLayer {
  constructor(data, params) {
    this.params = params;

    return L.geoJson(data, {
      pointToLayer: (feature) => {
        // If it doesn't have data, don't show it
        // We should pass the current filters to see witch crop is selected instead of hardcoding it
        const cropSelected = feature.properties.Rice;

        if (!cropSelected) {
          return null;
        }

        // Options
        const options = {
          location: feature.geometry.coordinates,
          className: 'c-marker-bubble',
          size: this._getSize(cropSelected),
          data: feature.properties
        };

        // Marker && infowindow html
        const divHtmlIcon = this._setMarkerHtml(cropSelected);
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
    console.info(properties);
    return (`
      <div class="c-infowindow -no-iteraction">
        <h3>Country name</h3>
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

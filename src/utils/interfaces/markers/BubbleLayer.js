/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import L from 'leaflet';
import { format } from 'd3-format';

/**
 * Creating buble marker layer for region and countries layer
 * @param  {Object} geoJson
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleLayer {
  // var markerTemplate = HandlebarsTemplates['marker_bubble'];
  // var infowindowTemplate = HandlebarsTemplates['infowindow_bubble'];

  constructor(data, params) {
    this.params = params;

    return L.geoJson(data, {
      pointToLayer: (feature) => {
        // If it doesn't have data, don't show it
        if (!feature.properties.Rice) {
          return null;
        }

        // Options
        const options = {
          location: feature.geometry.coordinates,
          className: 'c-marker-bubble',
          size: this._getSize(feature.properties.Rice),
          data: feature.properties
        };

        // Marker && infowindow html
        const divHtmlIcon = this._setMarkerHtml(options.data.Rice);
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
  static _setMarkerHtml(value) {
    const _value = format('.3s')(value);
    return (`
      <div class="marker-bubble-inner">
        ${_value}
      </div>
    `);
  }

  static _setInfowindowHtml(properties) {
    console.info(properties);
    return (`
      <div class="c-infowindow -no-iteraction">
        <h3>Country name</h3>
      </div>`
    );
  }

  static _getSize(v) {
    const size = (v < 1) ? 1 : v;
    const multiplicator = 2.5;
    const constant = 50;
    const border = 10;

    return border + constant + (multiplicator * Math.log(size));
  }
}

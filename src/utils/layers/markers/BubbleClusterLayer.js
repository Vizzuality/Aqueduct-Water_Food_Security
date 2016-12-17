/* global PruneCluster, PruneClusterForLeaflet */
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import L from 'leaflet';
import find from 'lodash/find';
import { format } from 'd3-format';

/**
 * Creating buble cluster marker for food layers
 * @param  {Array} geoJson
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleClusterLayer {
  constructor(geoJson, params) {
    const customParams = params;
    const pruneCluster = new PruneClusterForLeaflet();

    pruneCluster.PrepareLeafletMarker = (leafletMarker, data) => {
      leafletMarker.setIcon(data.icon);
      leafletMarker.off('click').on('click', () => {
        console.info('click');
      });
    };

    pruneCluster.BuildLeafletIcon = (feature) => {
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

      const divHtmlIcon = this._setMarkerHtml(cropSelected.value);
      const divHtmlInfowindow = this._setInfowindowHtml(feature.properties);

      const bubbleIcon = L.divIcon({
        iconSize: [60, 60],
        className: 'c-marker-bubble',
        html: divHtmlIcon
      });

      const marker = new PruneCluster.Marker(options.location[1], options.location[0]); // lat, lng
      marker.data.icon = bubbleIcon;
      marker.data.feature = feature;
      return marker;
    };

    pruneCluster.originalIcon = pruneCluster.BuildLeafletClusterIcon;

    pruneCluster.BuildLeafletClusterIcon = (cluster) => {
      const icon = pruneCluster.originalIcon(cluster);
      icon.options.iconSize = new L.Point(60, 60, null);
      return icon;
    };

    pruneCluster.getBounds = () => {
      const bounds = pruneCluster.Cluster.ComputeGlobalBounds();
      if (!bounds) {
        return bounds;
      }
      const southWest = L.latLng(bounds.minLat, bounds.maxLng);
      const northEast = L.latLng(bounds.maxLat, bounds.minLng);
      return L.latLngBounds(southWest, northEast);
    };

    geoJson.forEach((feature) => {
      pruneCluster.RegisterMarker(pruneCluster.BuildLeafletIcon(feature));
    });

    return pruneCluster;
  }

  // STATIC methods
  // - _setMarkerHtml
  // - _setInfowindowHtml
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

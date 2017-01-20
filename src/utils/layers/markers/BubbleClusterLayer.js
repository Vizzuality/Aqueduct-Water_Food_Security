/* global PruneCluster, PruneClusterForLeaflet */
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
/* eslint new-cap: 0 */
/* eslint class-methods-use-this: 0 */

import L from 'leaflet/dist/leaflet';
import { format } from 'd3-format';
import { PruneCluster, PruneClusterForLeaflet } from '../../../../lib/PruneCluster';

/**
 * Creating buble cluster marker for food layers
 * @param  {Array} geoJson
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleClusterLayer {
  constructor(geoJson, layer) {
    const { id } = layer;
    const pruneCluster = new PruneClusterForLeaflet();

    // MARKER
    pruneCluster.BuildLeafletIcon = (feature) => {
      const location = feature.geometry.coordinates;
      const marker = new PruneCluster.Marker(location[1], location[0]); // lat, lng
      marker.data.feature = feature;
      return marker;
    };

    pruneCluster.PrepareLeafletMarker = (leafletMarker, { feature }) => {
      // Options
      const options = {
        location: feature.geometry.coordinates,
        className: this._setMarkerClass(id, feature.properties.value),
        size: this._getSize(feature.properties.value),
        data: feature.properties,
        htmlIcon: this._setMarkerHtml(feature.properties.value),
        htmlInfowindow: this._setInfowindowHtml(feature.properties)
      };

      leafletMarker.setIcon(L.divIcon({
        iconSize: [options.size, options.size],
        className: options.className,
        html: options.htmlIcon
      }));
      leafletMarker.bindPopup(options.htmlInfowindow);

      // BINDINGS
      leafletMarker.off('mouseover').on('mouseover', function mouseover() {
        this.openPopup();
      });
      leafletMarker.off('mouseout').on('mouseout', function mouseleave() {
        this.closePopup();
      });
    };

    // CLUSTER
    pruneCluster.originalIcon = pruneCluster.BuildLeafletClusterIcon;

    pruneCluster.BuildLeafletCluster = (cluster, position) => {
      const m = new L.Marker(position, {
        icon: pruneCluster.BuildLeafletClusterIcon(cluster)
      });

      m.bindPopup(this._setInfowindowClusterHtml(cluster));

      m.on('click', () => {
        // Compute the  cluster bounds (it's slow : O(n))
        const markersArea = pruneCluster.Cluster.FindMarkersInArea(cluster.bounds);
        const b = pruneCluster.Cluster.ComputeBounds(markersArea);

        if (b) {
          const bounds = new L.LatLngBounds(
            new L.LatLng(b.minLat, b.maxLng),
            new L.LatLng(b.maxLat, b.minLng));

          // We should check if the sidebar is opened
          pruneCluster._map.fitBounds(bounds, {
            paddingTopLeft: [600, 25],
            paddingBottomRight: [60, 25]
          });
        }
      });

      m.on('mouseover', function mouseover() {
        this.openPopup();
      });

      m.on('mouseout', function mouseout() {
        this.closePopup();
      });

      return m;
    };

    pruneCluster.BuildLeafletClusterIcon = (cluster) => {
      const icon = pruneCluster.originalIcon(cluster);
      icon.options.iconSize = new L.Point(30, 30, null);
      icon.options.className = 'c-marker-cluster-bubble';

      return icon;
    };

    geoJson.forEach((feature) => {
      pruneCluster.RegisterMarker(pruneCluster.BuildLeafletIcon(feature));
    });

    return pruneCluster;
  }

  // STATIC methods
  // - _setMarkerClass
  // - _setMarkerHtml
  // - _setInfowindowHtml
  // - _setInfowindowClusterHtml
  // - _getSize

  _setMarkerClass(layerId, value) {
    let additionalClass = '';
    switch (layerId) {
      case 'b8e135d2-b64f-4ea3-93e9-9f8d1245fb2a':
        if (value > 0) { additionalClass = '-positive'; }
        if (value < 0) { additionalClass = '-negative'; }
        break;
      default:

    }
    return `c-marker-bubble ${additionalClass}`;
  }


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

  _setInfowindowClusterHtml(properties) {
    return (`
      <div class="c-infowindow -no-iteraction">
      <h3>${properties.population} countries</h3>
      </div>`
    );
  }

  _getSize(v) {
    const size = (v < 1 && v > -1) ? 1 : Math.abs(v);
    const reductor = 3.5;
    const constant = 55;
    const border = 10;

    const value = border + constant + (Math.pow(size, 0.5) / reductor);
    return value;
  }

}

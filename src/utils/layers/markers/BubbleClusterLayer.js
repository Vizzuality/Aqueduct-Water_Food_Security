import L from 'leaflet';
import { render } from 'react-dom';
import InfoWindow from 'components/ui/InfoWindow';

// Redux
import { store, dispatch } from 'main';
import { setFilters } from 'actions/filters';


import { format } from 'd3-format';
import { PruneCluster, PruneClusterForLeaflet } from '../../../../lib/PruneCluster';

/**
 * Creating buble cluster marker for food layers
 * @param  {Array} geoJson
 * @param  {Object} params
 * @return {Object} layer
 */
export default class BubbleClusterLayer {
  constructor(geoJson, layer, config) {
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
        className: BubbleClusterLayer._setMarkerClass(id, feature.properties.value),
        size: BubbleClusterLayer._getSize(feature.properties.value, config),
        data: feature.properties,
        htmlIcon: BubbleClusterLayer._setMarkerHtml(feature.properties.value),
        htmlInfowindow: BubbleClusterLayer._setInfowindowHtml(feature.properties)
      };

      // Set icon
      leafletMarker.setIcon(L.divIcon({
        iconSize: [options.size, options.size],
        className: options.className,
        html: options.htmlIcon
      }));

      // Set popup
      leafletMarker.bindPopup(
        render(
          InfoWindow({
            title: feature.properties.country,
            list: [{
              label: 'Units',
              value: feature.properties.unit
            }]
          }),
          window.document.createElement('div')
        )
      );

      // BINDINGS
      leafletMarker.off('click').on('click', () => {
        dispatch(setFilters({ scope: 'country', country: feature.properties.iso }));
      });
      leafletMarker.off('mouseover').on('mouseover', function mouseover() {
        this.openPopup();
      });
      leafletMarker.off('mouseout').on('mouseout', function mouseleave() {
        this.closePopup();
      });
    };

    // CLUSTER
    pruneCluster.originalIcon = pruneCluster.BuildLeafletClusterIcon;

    // disables clustering
    pruneCluster.Cluster.Size = 0.01;

    pruneCluster.BuildLeafletCluster = (cluster, position) => {
      const m = new L.Marker(position, {
        icon: pruneCluster.BuildLeafletClusterIcon(cluster)
      });

      m.bindPopup(BubbleClusterLayer._setInfowindowClusterHtml(cluster));

      m.on('click', () => {
        // Compute the  cluster bounds (it's slow : O(n))
        const markersArea = pruneCluster.Cluster.FindMarkersInArea(cluster.bounds);
        const b = pruneCluster.Cluster.ComputeBounds(markersArea);

        if (b) {
          const bounds = new L.LatLngBounds(
            new L.LatLng(b.minLat, b.maxLng),
            new L.LatLng(b.maxLat, b.minLng));

          // We should check if the sidebar is opened
          const sidebarWidth = store.getState().sidebar.width + 25;
          pruneCluster._map.fitBounds(bounds, {
            paddingTopLeft: [sidebarWidth, 25],
            paddingBottomRight: [50, 25]
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
  static _setMarkerClass(layerId, value) {
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


  static _setMarkerHtml(value) {
    let _value;
    if (value < 0.001 && value > 0) {
      _value = '< 0.001';
    } else {
      _value = format((value < 1 && value > -1) ? '.3f' : '.3s')(value);
    }
    return (`
      <div class="marker-bubble-inner">
      ${_value}
      </div>
      `);
  }

  static _setInfowindowHtml(properties) {
    return (`
      <div class="c-infowindow -no-iteraction">
      <h3>${properties.country}</h3>
      </div>`
    );
  }

  static _setInfowindowClusterHtml(properties) {
    return (`
      <div class="c-infowindow -no-iteraction">
      <h3>${properties.population} countries</h3>
      </div>`
    );
  }

  static _getSize(v, { minValue, maxValue }) {
    // minimun radio of the bubble
    const baseRadio = 55;
    // multiplicator to make the bubble larger based on the relative percentage.
    const offset = 75;
    // calculates percentage relative of a value based on its min and max values
    const relativePercentage = ((Math.abs(v) ** 0.5) - (minValue ** 0.5)) / ((maxValue ** 0.5) - (minValue ** 0.5));

    return baseRadio + (offset * relativePercentage);
  }
}

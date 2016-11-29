/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from 'constants/map';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map', {
      minZoom: MAP_CONFIG.minZoom,
      zoom: this.props.map.zoom,
      center: [this.props.map.latLng.lat, this.props.map.latLng.lng],
      detectRetina: true
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.tileLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
                      .addTo(this.map)
                      .setZIndex(0);

    // Listen to leaflet events
    this.addMapEventListeners();
    // Set map params on route loading
    this.props.setMapParams(this.getMapParams());
  }

  // TODO: update with real check
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Remember to remove the listeners before removing the map
    // or they will stay in memory
    this.removeMapEventListeners();
    this.map.remove();
  }

  // GETTERS
  getMapParams() {
    const params = {
      zoom: this.map.getZoom(),
      latLng: this.map.getCenter()
    };
    return params;
  }

  // MAP LISTENERS
  addMapEventListeners() {
    function mapChangeHandler() {
      // Dispatch the action to set the params
      this.props.setMapParams(this.getMapParams());
    }
    this.map.on('zoomend', mapChangeHandler.bind(this));
    this.map.on('dragend', mapChangeHandler.bind(this));
  }

  removeMapEventListeners() {
    this.map.off('zoomend');
    this.map.off('dragend');
  }

  // RENDER
  render() {
    return (
      <div id={'map'} className="c-map" />
    );
  }
}

Map.propTypes = {
  // STORE
  map: React.PropTypes.object,
  // ACTIONS
  setMapParams: React.PropTypes.func
};

export default Map;

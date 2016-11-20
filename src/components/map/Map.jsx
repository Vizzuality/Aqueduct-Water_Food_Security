/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from 'constants/map';

class Map extends React.Component {

  componentDidMount() {
    // Build map settings from router params
    const mapParams = {
      zoom: this.props.map.zoom !== undefined ? +this.props.map.zoom : MAP_CONFIG.zoom,
      lat: this.props.map.latLng.lat !== undefined ? +this.props.map.latLng.lat : MAP_CONFIG.latLng.lat,
      lng: this.props.map.latLng.lng !== undefined ? +this.props.map.latLng.lng : MAP_CONFIG.latLng.lng
    };

    this.map = L.map('map', {
      minZoom: MAP_CONFIG.minZoom,
      zoom: mapParams.zoom,
      center: [mapParams.lat, mapParams.lng],
      detectRetina: true
    });
    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png')
                      .addTo(this.map)
                      .setZIndex(0);

    // Listen to leaflet events
    this.addMapEventListeners();
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
      <div className="l-map -fullscreen">
        <div id={'map'} className="c-map" />
      </div>
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

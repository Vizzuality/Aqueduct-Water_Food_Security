/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet';
import { MAP_CONFIG } from 'constants/map';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map(this.mapNode, {
      minZoom: MAP_CONFIG.minZoom,
      zoom: this.props.mapConfig.zoom,
      zoomControl: isNaN(this.props.mapConfig.zoomControl) ? MAP_CONFIG.zoomControl : this.props.mapConfig.zoomControl,
      center: [this.props.mapConfig.latLng.lat, this.props.mapConfig.latLng.lng],
      detectRetina: true
    });

    if (this.props.mapConfig.fitOn) {
      this.fitMap(this.props.mapConfig.fitOn);
    }

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl && this.map.zoomControl.setPosition('topright');
    this.tileLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
                      .addTo(this.map)
                      .setZIndex(0);

    if (this.props.setMapParams) {
      // Listen to leaflet events
      this.addMapEventListeners();
      // Set map params on route loading
      this.props.setMapParams(this.getMapParams());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.mapConfig.fitOn) !== JSON.stringify(nextProps.mapConfig.fitOn)) {
      this.fitMap(nextProps.mapConfig.fitOn);
    }
  }

  // TODO: update with real check
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Remember to remove the listeners before removing the map
    // or they will stay in memory
    this.props.setMapParams && this.removeMapEventListeners();
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

  fitMap(geoJson) {
    const geojsonLayer = L.geoJson(geoJson);
    this.map.fitBounds(geojsonLayer.getBounds());
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
      <div ref={(node) => { this.mapNode = node; }} className="c-map" />
    );
  }
}

Map.propTypes = {
  // STORE
  mapConfig: React.PropTypes.object,
  // ACTIONS
  setMapParams: React.PropTypes.func
};

export default Map;

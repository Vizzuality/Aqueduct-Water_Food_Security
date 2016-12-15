/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet';
import isEqual from 'lodash/isEqual';

import { MAP_CONFIG } from 'constants/map';
import LayerManager from 'utils/layers/LayerManager';
import Legend from 'components/legend/Legend';

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
      this.fitMap(this.props.mapConfig.fitOn.geometry);
    }

    this.layerManager = new LayerManager(this.map /* , onLayerAddedOK, onLayerAddedKO */);

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>');
    this.map.zoomControl && this.map.zoomControl.setPosition('topright');
    this.tileLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
                      .addTo(this.map)
                      .setZIndex(0);

    if (this.props.setMapParams) {
      // Listen to leaflet events
      this.addMapEventListeners();
    }

    this.addLayers();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.mapConfig.fitOn && !this.props.mapConfig.fitOn) || (this.props.mapConfig.fitOn && this.props.mapConfig.fitOn.id !== nextProps.mapConfig.fitOn.id)) {
      this.fitMap(nextProps.mapConfig.fitOn.geometry);
    }
  }

  // TODO: update with real check
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.filters, this.props.filters) || !isEqual(nextProps.layersActive, this.props.layersActive)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this.removeLayers();
    this.addLayers();
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

  // Layer methods
  addLayer(layer) {
    this.layerManager.addLayer(layer, this.props.filters);
  }

  addLayers() {
    this.props.layersActive.forEach((layer) => {
      this.addLayer(layer);
    });
  }

  removeLayer(layer) {
    this.layerManager.removeLayer(layer.id);
  }

  removeLayers() {
    this.layerManager.removeLayers();
  }

  // RENDER
  render() {
    return (
      <div className="c-map">
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
        {/* <Legend className="-map" layers={this.props.layersActive} /> */}
      </div>
    );
  }
}

Map.propTypes = {
  // STORE
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  // ACTIONS
  setMapParams: React.PropTypes.func
};

export default Map;

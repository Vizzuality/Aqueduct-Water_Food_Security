/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet/dist/leaflet';
import isEqual from 'lodash/isEqual';
import LayerManager from 'utils/layers/LayerManager';
import { Spinner } from 'aqueduct-components';

import { MAP_CONFIG } from 'constants/map';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.map = L.map(this.mapNode, {
      minZoom: MAP_CONFIG.minZoom,
      zoom: this.props.mapConfig.zoom,
      zoomControl: isNaN(this.props.mapConfig.zoomControl) ? MAP_CONFIG.zoomControl : this.props.mapConfig.zoomControl,
      center: [this.props.mapConfig.latLng.lat, this.props.mapConfig.latLng.lng],
      detectRetina: true,
      scrollWheelZoom: !!this.props.mapConfig.scrollWheelZoom
    });

    if (this.props.mapConfig.bounds) {
      this.fitBounds(this.props.mapConfig.bounds.geometry);
    }

    // SETTERS
    this.setAttribution();
    this.setZoomControl();
    this.setBasemap();
    this.setMapEventListeners();


    // Add layers
    this.setLayerManager();
    this.addLayers(this.props.layersActive, this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mapConfig.bounds && nextProps.mapConfig.bounds.id) {
      const sidebarWidth = (nextProps.sidebar && nextProps.sidebar.width) ? nextProps.sidebar.width : 0;
      if (this.props.mapConfig.bounds && this.props.mapConfig.bounds.id !== nextProps.mapConfig.bounds.id) {
        this.fitBounds(nextProps.mapConfig.bounds.geometry, sidebarWidth || 0);
      } else if (!this.props.mapConfig.bounds) {
        this.fitBounds(nextProps.mapConfig.bounds.geometry, sidebarWidth || 0);
      }
    }

    if (nextProps.sidebar && this.props.sidebar && this.props.mapConfig.bounds) {
      if (nextProps.sidebar.width !== this.props.sidebar.width) {
        this.fitBounds(this.props.mapConfig.bounds.geometry, nextProps.sidebar.width || 0);
      }
    }

    const filtersChanged = !isEqual(nextProps.filters, this.props.filters);
    const layersActiveChanged = !isEqual(nextProps.layersActive, this.props.layersActive);
    if (filtersChanged || layersActiveChanged) {
      this.removeLayers();
      this.addLayers(nextProps.layersActive, nextProps.filters);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const loadingChanged = this.state.loading !== nextState.loading;
    const sidebarWidthChanged = this.props.sidebar ? (+this.props.sidebar.width !== +nextProps.sidebar.width) : false;
    return loadingChanged || sidebarWidthChanged;
  }

  componentWillUnmount() {
    this._mounted = false;
    // Remember to remove the listeners before removing the map
    // or they will stay in memory
    this.props.setMapParams && this.removeMapEventListeners();
    this.map.remove();
  }


  // SETTERS
  setLayerManager() {
    const stopLoading = () => {
      // Don't execute callback if component has been unmounted
      this._mounted && this.setState({
        loading: false
      });
    };

    this.layerManager = new LayerManager(this.map, {
      onLayerAddedSuccess: stopLoading,
      onLayerAddedError: stopLoading
    });
  }

  setAttribution() {
    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>');
  }

  setZoomControl() {
    this.map.zoomControl && this.map.zoomControl.setPosition('topright');
  }

  setBasemap() {
    this.tileLayer = L.tileLayer(config.BASEMAP_TILE_URL, {})
                      .addTo(this.map)
                      .setZIndex(0);

    this.labelLayer = L.tileLayer(config.BASEMAP_LABEL_URL, {})
                       .addTo(this.map)
                       .setZIndex(1000);
  }

  // GETTERS
  getMapParams() {
    const params = {
      zoom: this.getZoom(),
      latLng: this.getCenter()
    };
    return params;
  }

  // MAP FUNCTIONS
  getCenter() { return this.map.getCenter(); }

  getZoom() { return this.map.getCenter(); }

  fitBounds(geoJson, sidebarWidth) {
    const geojsonLayer = L.geoJson(geoJson);
    this.map.fitBounds(geojsonLayer.getBounds(), {
      paddingTopLeft: [sidebarWidth || 0, 0],
      paddingBottomRight: [0, 0]
    });
  }


  // MAP LISTENERS
  setMapEventListeners() {
    function mapChangeHandler() {
      // Dispatch the action to set the params
      this.props.setMapParams(this.getMapParams());
    }

    if (this.props.setMapParams) {
      this.map.on('zoomend', mapChangeHandler.bind(this));
      this.map.on('dragend', mapChangeHandler.bind(this));
    }
  }

  removeMapEventListeners() {
    this.map.off('zoomend');
    this.map.off('dragend');
  }

  // LAYER METHODS
  addLayer(layer, filters) {
    this.setState({
      loading: true
    });
    this.layerManager.addLayer(layer, filters || this.props.filters);
  }

  addLayers(layers, filters) {
    if (!layers) return;
    layers.forEach((layer) => {
      this.addLayer(layer, filters);
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
    const spinnerStyles = { marginLeft: this.props.sidebar && +this.props.sidebar.width ? `${+this.props.sidebar.width / 2}px` : 0 };
    return (
      <div className="c-map">
        {this.state.loading && <Spinner isLoading style={spinnerStyles} />}
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  // STORE
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  LayerManager: React.PropTypes.func,
  layersActive: React.PropTypes.array,
  // ACTIONS
  setMapParams: React.PropTypes.func
};

export default Map;

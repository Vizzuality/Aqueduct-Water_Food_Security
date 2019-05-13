import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { Map as VizzMap } from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Spinner
} from 'aqueduct-components';

// components
import ShareModal from 'containers/modal/ShareModal';
import DownloadMapControl from 'components/map/map-controls/download-map';
import MapHeader from './header';
import Legend from './legend';

// helpers
import { updateCartoCSS, prepareMarkerLayer } from './helpers';

// constants
import { BASEMAP_LAYER_CONFIG, LABEL_LAYER_CONFIG } from './constants';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layers: props.layers,
      loading: true,
      loadingCartoCSS: false,
      loadingMarkers: false,
      mapElem: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      layers,
      filters,
      foodLayers,
      mapState
    } = this.props;
    const {
      layers: nextLayers,
      filters: nextFilters,
      foodLayers: nextFoodLayers,
      mapState: nextMapState
    } = nextProps;
    const { zoom } = mapState;
    const { zoom: nextZoom } = nextMapState;
    const layersChanged = !isEqual(layers, nextLayers);
    const filtersChanged = !isEqual(filters, nextFilters);
    const foodLayersChanged = !isEqual(foodLayers, nextFoodLayers);
    const zoomChanged = zoom !== nextZoom;

    if (nextFoodLayers && !nextFoodLayers[0]) {
      this.setState({
        loading: true,
        layers: [...nextFoodLayers, ...nextLayers]
      });
    }

    if ((foodLayersChanged || filtersChanged || zoomChanged) && nextFoodLayers[0]) {
      this.setState({ loading: true }, () => {
        prepareMarkerLayer(nextFoodLayers[0], nextFilters, nextZoom)
          .then((markerLayer) => {
            this.setState({ layers: [markerLayer, ...nextLayers] });
          });
      });
    }

    // if the incoming layer is the one crop one we need to update its cartoCSS manually
    if ((layersChanged || filtersChanged) && nextLayers[0] && nextLayers[0].id === '064a524f-0e58-41fb-b948-f7bb66f43ef0') {
      this.setState({
        loading: true,
        loadingCartoCSS: true
      }, () => {
        updateCartoCSS(nextLayers[0], nextFilters)
          .then((updatedLayer) => {
            const [, ...restLayers] = nextLayers;

            this.setState({
              loadingCartoCSS: false,
              loading: true,
              layers: [updatedLayer, ...restLayers]
            });
          });
      });
    }

    if (layersChanged) {
      this.setState({
        layers: nextLayers,
        loading: true
      });
    }
  }

  toggleShareModal() {
    const { toggleModal } = this.props;
    toggleModal(true, { children: ShareModal });
  }

  handleZoomChange(zoom) {
    const { setMapLocation } = this.props;

    setMapLocation({ zoom });
  }

  updateMap(event, map) {
    const { setMapLocation } = this.props;

    setMapLocation({
      zoom: map.getZoom(),
      center: map.getCenter()
    });
  }

  render() {
    const {
      mapState,
      countries,
      filters
    } = this.props;
    const {
      layers,
      loading,
      loadingCartoCSS,
      loadingMarkers,
      mapElem
    } = this.state;
    const mapEvents = { moveend: (e, _map) => { this.updateMap(e, _map); } };

    // console.log('active layers:');
    // console.log(layers);

    return (
      <div className="l-map">
        <Spinner
          isLoading={loading}
          className="-map"
        />
        <VizzMap
          mapOptions={mapState}
          events={mapEvents}
          bounds={mapState.bounds}
          basemap={BASEMAP_LAYER_CONFIG}
          label={LABEL_LAYER_CONFIG}
        >
          {_map => (
            <Fragment>
              <LayerManager
                map={_map}
                plugin={PluginLeaflet}
                onReady={() => {
                  this._map = _map;
                  this.setState({ mapElem: _map });
                  if (!loadingCartoCSS && !loadingMarkers) this.setState({ loading: false });
                }}
              >
                {layers.map((l, i) => (
                  <Layer
                    {...l}
                    key={l.id}
                    opacity={l.opacity}
                    zIndex={1000 - i}
                    {...l.params && { params: l.params }}
                    {...l.sqlParams && { sqlParams: l.sqlParams }}
                    {...l.decodeParams && { decodeParams: l.decodeParams }}
                    {... l.interactionConfig && {
                      interactivity: ['carto', 'cartodb'].includes(l.provider)
                        ? (l.interactionConfig.output || []).map(o => o.column)
                        : true
                    }}
                  />
                ))}
              </LayerManager>

              <MapControls>
                <ZoomControl
                  zoom={mapState.zoom}
                  onZoomChange={(zoom) => { this.handleZoomChange(zoom); }}
                />

                <ShareButton onClick={() => { this.toggleShareModal(); }} />
                <DownloadMapControl mapElem={mapElem._mapPane} />
              </MapControls>

              {countries.length > 0 && (<MapHeader />)}

              <Legend
                className="-map"
                filters={filters}
                layers={layers}
                onToggleInfo={this.toggleSourceModal}
              />
            </Fragment>
          )}
        </VizzMap>
      </div>
    );
  }
}

Map.propTypes = {
  mapState: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  foodLayers: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setMapLocation: PropTypes.func.isRequired
};

export default Map;

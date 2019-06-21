import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
// import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
// import { LayerManager, Layer } from 'layer-manager/dist/components';
import { Map as VizzMap } from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Spinner
} from 'aqueduct-components';

// components
import ShareModal from 'components/modal/share';
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
    const isSingleCropLayer = '064a524f-0e58-41fb-b948-f7bb66f43ef0';
    const isAllCropsLayer = 'a533c717-8473-412c-add8-89b0a008e3ac';

    if ((foodLayersChanged || filtersChanged || zoomChanged) && nextFoodLayers[0]) {
      this.setState({ loading: true }, () => {
        prepareMarkerLayer(nextFoodLayers[0], nextFilters, nextZoom)
          .then((markerLayer) => {
            const { layers: currenLayers } = this.state;
            const filteredLayers = currenLayers.filter(_layer => !_layer.isMarkerLayer);
            this.setState({ layers: [markerLayer, ...filteredLayers] });
          });
      });
    }

    // if the incoming layer is the one crop one we need to update its cartoCSS manually
    if (layersChanged && (nextLayers[0] && nextLayers[0].id === isSingleCropLayer)) {
      this.setState({
        loading: true,
        loadingCartoCSS: true
      }, () => {
        updateCartoCSS(nextLayers[0], nextFilters)
          .then((updatedLayer) => {
            const { layers: currentLayers } = this.state;
            // filters any previous all crop layer and one crop layer present.
            const filteredLayers = currentLayers.filter(
              _layer => ![isAllCropsLayer, isSingleCropLayer].includes(_layer.id)
            );

            this.setState({
              loadingCartoCSS: false,
              loading: true,
              layers: [updatedLayer, ...filteredLayers]
            });
          });
      });
    }

    if (layersChanged && (nextLayers[0] && nextLayers[0].id !== isSingleCropLayer)) {
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
    const {
      mapState: { bounds },
      setMapLocation
    } = this.props;

    // center: _bbox.bbox ? ({
    //   lat: _bbox.bbox[3],
    //   lng: _bbox.bbox[2],
    // }) : _mapState.center,

    // console.log('bbox', bbox)

    console.log('MOVEEND')

    setMapLocation({
      zoom: map.getZoom(),
      center: map.getCenter(),

      // center: bounds.bbox ?
      //   ({
      //     lat: bounds.bbox[3],
      //     lng: bounds.bbox[2],
      //   })
      //   : map.getCenter()
    });
  }

  render() {
    const {
      mapState,
      countries,
      filters,
      mapControls,
      legend
    } = this.props;
    const {
      layers,
      loading,
      loadingCartoCSS,
      loadingMarkers,
      mapElem
    } = this.state;
    const mapEvents = { moveend: (e, _map) => { this.updateMap(e, _map); } };

    console.log(mapState.bounds)

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
              {/* <LayerManager
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
                    {...l.interactionConfig && {
                      interactivity: ['carto', 'cartodb'].includes(l.provider)
                        ? (l.interactionConfig.output || []).map(o => o.column)
                        : true
                    }}
                  />
                ))}
              </LayerManager>

              {mapControls && (
                <MapControls>
                  <ZoomControl
                    zoom={mapState.zoom}
                    onZoomChange={(zoom) => { this.handleZoomChange(zoom); }}
                  />

                  <ShareButton onClick={() => { this.toggleShareModal(); }} />
                  <DownloadMapControl mapElem={mapElem._mapPane} />
                </MapControls>
              )}


              {countries.length > 0 && (<MapHeader />)}

              {legend && (
                <Legend
                  className="-map"
                  expanded
                  filters={filters}
                  layers={layers}
                  onToggleInfo={this.toggleSourceModal}
                />
              )} */}
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
  mapControls: PropTypes.bool,
  legend: PropTypes.bool,
  foodLayers: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setMapLocation: PropTypes.func.isRequired
};

Map.defaultProps = {
  mapControls: true,
  legend: true
};

export default Map;

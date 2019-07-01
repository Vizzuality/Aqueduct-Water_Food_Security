import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import axios from 'axios';
import { MapControls, ZoomControl, Icon, Spinner } from 'aqueduct-components';
import VizzMap from 'vizzuality-components/dist/map';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';

// components
import LegendMobile from 'components/legend';

// helpers
import { updateCartoCSS, prepareMarkerLayer } from 'components/map/helpers';
import { reduceParams, reduceSqlParams } from 'utils/layers/params-parser';

// constants
import {
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG
} from 'components/map/constants';

class CompareMaps extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      compareConfig: props.compareConfig,
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      layers: nextLayers,
      foodLayers: nextFoodLayers,
      compareConfig: nextCompareConfig,
    } = nextProps;
    const isSingleCropLayer = '064a524f-0e58-41fb-b948-f7bb66f43ef0';
    const isAllCropsLayer = 'a533c717-8473-412c-add8-89b0a008e3ac';

    this.setState({ compareConfig: nextCompareConfig }, () => {
      if (nextFoodLayers[0]) {
        this.setState({ loading: true }, () => {
          const layerPromises = nextCompareConfig.map(
            _compareConfig => prepareMarkerLayer(
              nextFoodLayers[0],
              _compareConfig.filters,
              1 || _compareConfig.mapConfig.zoom
            )
          );

          axios.all(layerPromises)
            .then(axios.spread((leftOneCropLayer, rightOneCropLayer) => {
              const { compareConfig: currentCompareConfig } = this.state;
              const updatedCompareConfig = currentCompareConfig.map((_nextCompareConfig, index) => {
                const layerToImplement = index === 0 ? leftOneCropLayer : rightOneCropLayer;
                const { layers: currentLayers } = _nextCompareConfig;
                const filteredLayers = currentLayers.filter(_layer => !_layer.isMarkerLayer);

                return ({
                  ..._nextCompareConfig,
                  layers: [
                    layerToImplement,
                    ...filteredLayers
                  ]
                });
              });

              this.setState({
                compareConfig: updatedCompareConfig,
                loading: false
              });
            }));
        });
      }

      if ((nextLayers[0] && nextLayers[0].id === isSingleCropLayer) && !nextFoodLayers[0]) {
        this.setState({ loading: true }, () => {
          const layerPromises = nextCompareConfig.map((_compareConfig) => {
            const parametrizedLayer = {
              ...nextLayers[0],
              ...nextLayers[0].layerConfig.params_config
              && { params: reduceParams(nextLayers[0].layerConfig.params_config, _compareConfig.filters) },
              ...nextLayers[0].layerConfig.sql_config
              && { sqlParams: reduceSqlParams(nextLayers[0].layerConfig.sql_config, _compareConfig.filters) }
            };

            return updateCartoCSS(parametrizedLayer, _compareConfig.filters);
          });

          axios.all(layerPromises)
            .then(axios.spread((leftOneCropLayer, rightOneCropLayer) => {
              const updatedCompareConfig = nextCompareConfig.map((_nextCompareConfig, index) => {
                const layerToImplement = index === 0 ? leftOneCropLayer : rightOneCropLayer;
                const { layers: currentLayers } = _nextCompareConfig;
                const filteredLayers = currentLayers.filter(
                  _layer => ![isAllCropsLayer, isSingleCropLayer].includes(_layer.id)
                );

                return ({
                  ..._nextCompareConfig,
                  layers: [
                    layerToImplement,
                    ...filteredLayers
                  ]
                });
              });

              this.setState({
                compareConfig: updatedCompareConfig,
                loading: false
              });
            }));
        });
      }

      if ((nextLayers[0] && nextLayers[0].id !== isSingleCropLayer) && !nextFoodLayers[0]) {
        const { compareConfig: currentCompareConfig } = this.state;
        const updatedCompareConfig = currentCompareConfig.map(_compareConfig => ({
          ..._compareConfig,
          layers: nextLayers.map(_nextLayer => ({
            ..._nextLayer,
            ..._nextLayer.layerConfig.params_config
            && { params: reduceParams(_nextLayer.layerConfig.params_config, _compareConfig.filters) },
            ..._nextLayer.layerConfig.sql_config
            && { sqlParams: reduceSqlParams(_nextLayer.layerConfig.sql_config, _compareConfig.filters) }
          }))
        }));
        this.setState({
          compareConfig: updatedCompareConfig,
          loading: false
        });
      }
    });
  }

  handleMapUpdate(event, map, index) {
    const { compareConfig } = this.state;
    const nextCompareConfig = [...compareConfig];
    const newCompareConfig = {
      ...compareConfig[index],
      mapConfig: {
        ...compareConfig[index].mapConfig,
        zoom: map.getZoom(),
        center: map.getCenter()
      }
    };

    nextCompareConfig.splice(index, 1, newCompareConfig);

    this.setState({ compareConfig: nextCompareConfig });
  }

  handleZoomChange(index, zoom, map) {
    const { compareConfig } = this.state;
    const nextCompareConfig = [...compareConfig];
    const newCompareConfig = {
      ...compareConfig[index],
      mapConfig: {
        ...compareConfig[index].mapConfig,
        zoom,
        center: map.getCenter()
      }
    };

    nextCompareConfig.splice(index, 1, newCompareConfig);

    this.setState({ compareConfig: nextCompareConfig });
  }

  render() {
    const { compareConfig, loading } = this.state;

    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {compareConfig.map((_compareConfig, index) => {
            const { country, mapConfig, bounds, layers } = _compareConfig || {};

            if (!country) {
              return (
                <div
                  className="compareitem-column"
                  key={`${country}-${index}`}
                >
                  <div className="country-placeholder">
                    <div>
                      <Icon className="-huge country-placeholder-icon" name="icon-country" />
                      <p className="country-placeholder-text">Choose a country first</p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={`${country}-${index}`}
                className="compareitem-column"
              >
                <div className="compareitem-map">
                  <Spinner
                    isLoading={loading}
                    className="-map"
                  />
                  <VizzMap
                    mapOptions={mapConfig}
                    bounds={bounds}
                    basemap={BASEMAP_LAYER_CONFIG}
                    label={LABEL_LAYER_CONFIG}
                  >
                    {_map => (
                      <Fragment>
                        <LayerManager
                          map={_map}
                          plugin={PluginLeaflet}
                        >
                          {(layers || []).map((l, i) => (
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

                        {/* Map controls */}
                        <MapControls className="-left">
                          <LegendMobile />
                        </MapControls>

                        {/* Map controls */}
                        <MapControls>
                          <ZoomControl
                            zoom={mapConfig.zoom}
                            onZoomChange={(zoom) => { this.handleZoomChange(index, zoom, _map); }}
                          />
                        </MapControls>
                      </Fragment>
                    )}
                  </VizzMap>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CompareMaps.propTypes = {
  compareConfig: PropTypes.array.isRequired,
  layers: PropTypes.array.isRequired,
  foodLayers: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
};

export default CompareMaps;

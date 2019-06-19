import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { MapControls, ZoomControl, Icon } from 'aqueduct-components';
import { Map as VizzMap } from 'vizzuality-components/dist/bundle';
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

    this.state = { compareConfig: props.compareConfig };
  }

  componentWillReceiveProps(nextProps) {
    const {
      layers,
      filters,
      foodLayers,
      compareConfig,
      countries
    } = this.props;
    const {
      layers: nextLayers,
      filters: nextFilters,
      foodLayers: nextFoodLayers,
      compareConfig: nextCompareConfig,
      // countries: nextCountries
    } = nextProps;
    const layersChanged = !isEqual(layers, nextLayers);
    const filtersChanged = !isEqual(filters, nextFilters);
    const foodLayersChanged = !isEqual(foodLayers, nextFoodLayers);
    const compareConfigChanged = !isEqual(compareConfig, nextCompareConfig);
    // const countriesChanged = !isEqual(countries, nextCountries);
    const isSingleCropLayer = '064a524f-0e58-41fb-b948-f7bb66f43ef0';
    const isAllCropsLayer = 'a533c717-8473-412c-add8-89b0a008e3ac';

    if (compareConfigChanged) this.setState({ compareConfig: nextCompareConfig });

    // if ((foodLayersChanged || filtersChanged) && nextFoodLayers[0]) {
    //   this.setState({ loading: true }, () => {
    //     // check putting zoom manually
    //     prepareMarkerLayer(nextFoodLayers[0], nextFilters, 1)
    //       .then((markerLayer) => {
    //         const { layers: currenLayers } = this.state;
    //         const filteredLayers = currenLayers.filter(_layer => !_layer.isMarkerLayer);
    //         this.setState({ layers: [markerLayer, ...filteredLayers] });
    //       });
    //   });
    // }


    // if the incoming layer is the one crop one we need to update its cartoCSS manually
    if (layersChanged && (nextLayers[0] && nextLayers[0].id === isSingleCropLayer)) {
      this.setState({
        loading: true,
        loadingCartoCSS: true
      }, () => {
        nextCompareConfig.forEach((_compareConfig, index) => {
          const parametrizedLayer = {
            ...nextLayers[0],
            ...nextLayers[0].layerConfig.params_config
            && { params: reduceParams(nextLayers[0].layerConfig.params_config, _compareConfig.filters) },
            ...nextLayers[0].layerConfig.sql_config
            && { sqlParams: reduceSqlParams(nextLayers[0].layerConfig.sql_config, _compareConfig.filters) }
          };

          updateCartoCSS(parametrizedLayer, _compareConfig.filters)
            .then((oneCropLayer) => {
              const { layers: currentLayers } = _compareConfig;
              const filteredLayers = currentLayers.filter(
                _layer => ![isAllCropsLayer, isSingleCropLayer].includes(_layer.id)
              );

              const updatedCompareConfig = ({
                ..._compareConfig,
                layers: [
                  oneCropLayer,
                  ...filteredLayers
                ]
              });

              const newCompareConfig = [...nextCompareConfig];
              newCompareConfig.splice(index, 1, updatedCompareConfig);

              this.setState({ compareConfig: newCompareConfig });
            });
        });


          // return ({
          //   ..._compareConfig,
          //   layers: updatedFilters
          // });

          // this.setState({ compareConfig: updatedCompareConfig });
        // updateCartoCSS(nextLayers[0], nextFilters)
        //   .then((updatedLayer) => {
        //     const {
        //       layers: currentLayers,
        //       compareConfig
        //     } = this.state;
        //     // filters any previous all crop layer and one crop layer present.
        //     const filteredLayers = currentLayers.filter(
        //       _layer => ![isAllCropsLayer, isSingleCropLayer].includes(_layer.id)
        //     );

        //     const updatedCompareConfig = compareConfig.map(_compareConfig => ({
        //       ..._compareConfig,
        //       layers: [updatedLayer, ...filteredLayers]
        //     }));

        //     this.setState({ compareConfig: updatedCompareConfig });

        //     // this.setState({
        //     //   loadingCartoCSS: false,
        //     //   loading: true,
        //     //   layers: [updatedLayer, ...filteredLayers]
        //     // });
        //   });
      });
    }

    if (layersChanged && (nextLayers[0] && nextLayers[0].id !== isSingleCropLayer)) {
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
      this.setState({ compareConfig: updatedCompareConfig });
    }
  }

  render() {
    const { compareConfig } = this.state;

    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {compareConfig.map((_compareConfig) => {
            const { country, mapConfig, layers } = _compareConfig || {};

            if (!country) {
              return (
                <div className="compareitem-column">
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
                key={country}
                className="compareitem-column"
              >
                <div className="compareitem-map">
                  <VizzMap
                    mapOptions={mapConfig}
                    bounds={mapConfig.bounds}
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
                          <ZoomControl zoom={mapConfig.zoom} />
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
  layers: PropTypes.array.isRequired
};

export default CompareMaps;

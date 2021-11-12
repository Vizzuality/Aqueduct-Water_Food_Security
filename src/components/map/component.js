import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import isEqual from 'react-fast-compare';
import isEmpty from 'lodash/isEmpty';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import {
  Map as VizzMap,
  Legend as VizzLegend,
  LegendItemToolbar,
  LegendListItem,
  LegendItemButtonInfo,
  LegendItemButtonOpacity
} from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Spinner,
  SourceModal
} from 'aqueduct-components';

// utils
import { logEvent } from 'utils/analytics';

// components
import ShareModal from 'components/modal/share';
import DownloadMapControl from 'components/map/map-controls/download-map';
import BasemapControl from 'components/map/map-controls/basemap';
import MapHeader from './header';
import Legend from './legend';

// helpers
import { prepareMarkerLayer, updateCartoCSS } from './helpers';
import { parseMetadataLayer } from './utils';

// constants
import { LABEL_LAYER_CONFIG } from './constants';
// TODO: Remove this file once the analyzer is wired up
import RESULT_DATA from 'components/analyzer/TEMP_DATA.json'
import {
  extractTableValues,
} from 'constants/analyzer'

const DATA = extractTableValues(RESULT_DATA)

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
      mapState,
      parametrization
    } = this.props;
    const {
      layers: nextLayers,
      filters: nextFilters,
      foodLayers: nextFoodLayers,
      mapState: nextMapState,
      parametrization: nextParametrization
    } = nextProps;
    const { zoom } = mapState;
    const { zoom: nextZoom } = nextMapState;
    const layersChanged = !isEqual(layers, nextLayers);
    const filtersChanged = !isEqual(filters, nextFilters);
    const foodLayersChanged = !isEqual(foodLayers, nextFoodLayers);
    const zoomChanged = zoom !== nextZoom;
    const parametrizationChanged = !isEqual(parametrization, nextParametrization);
    const isSingleCropLayer = '32e964db-a2a0-4329-9bb1-470ebc99b622';
    const isAllCropsLayer = 'f67f5553-cc70-441c-9d1a-59044d552d58';

    if ((foodLayersChanged || filtersChanged || zoomChanged || parametrizationChanged)
      && nextFoodLayers[0]) {
      this.setState({ loading: true }, () => {
        prepareMarkerLayer(nextFoodLayers[0], nextFilters, nextZoom, nextParametrization)
          .then((markerLayer) => {
            const { layers: currenLayers } = this.state;
            const filteredLayers = currenLayers.filter(_layer => !_layer.isMarkerLayer);
            this.setState({ layers: [markerLayer, ...filteredLayers] });
          });
      });
    }

    // removes current marker layer if there's no next one
    if (foodLayersChanged && !nextFoodLayers[0]) {
      const { layers: currentLayers } = this.state;
      const layersWithoutMarker = currentLayers.filter(_layer => !_layer.isMarkerLayer);
      this.setState({ layers: layersWithoutMarker });
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
            const filteredLayers = currentLayers
              .filter(_layer => _layer.category !== 'water')
              .filter(_layer => ![isAllCropsLayer, isSingleCropLayer].includes(_layer.id));

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
    logEvent('[AQ-Food] Map', 'user clicks on share map', '');
  }

  handleZoomChange(zoom) {
    const { setMapLocation } = this.props;

    setMapLocation({ zoom });
  }

  updateMap(event, map) {
    const { setMapLocation } = this.props;

    setMapLocation({
      zoom: map.getZoom(),
      center: map.getCenter(),
    });
  }

  openLayerInfo(_layerGroup) {
    const { toggleModal } = this.props;
    const { layers } = _layerGroup;
    if (layers[0]) {
      toggleModal(true, {
        children: SourceModal,
        childrenProps: { layer: parseMetadataLayer(layers[0]) }
      });
    }
  }

  handleLayerOpacity(layer, opacity) {
    const { setLayerParametrization } = this.props;

    setLayerParametrization({ opacity });
  }

  render() {
    const {
      mapState,
      basemap,
      bounds,
      countries,
      filters,
      mapControls,
      legend,
      layerGroup
    } = this.props;
    const {
      layers,
      loading,
      loadingCartoCSS,
      loadingMarkers,
      mapElem
    } = this.state;
    const mapEvents = { moveend: (e, _map) => { this.updateMap(e, _map); } };

    const data = uniq(compact(DATA.map(d => parseFloat(d['Watershed ID']).toFixed(0))))
    const step = 500
    const ranges = [
      data.filter((e, i) => i < step),
      data.filter((e, i) => i >= step && i < step * 2),
      data.filter((e, i) => i >= step * 2 && i < step * 3),
      data.filter((e, i) => i >= step * 3 && i < step * 4),
      data.filter((e, i) => i >= step * 4 && i < step * 5),
      data.filter((e, i) => i >= step * 5 && i < step * 6),
      data.filter((e, i) => i >= step * 6 && i < step * 7),
      data.filter((e, i) => i >= step * 7 && i < step * 8),
      data.filter((e, i) => i >= step * 8 && i < step * 9),
      data.filter((e, i) => i >= step * 9 && i < step * 10),
      data.filter((e, i) => i >= step * 10 && i < step * 11),
      data.filter((e, i) => i >= step * 11 && i < step * 12),
      data.filter((e, i) => i >= step * 12 && i < step * 13),
      data.filter((e, i) => i >= step * 13 && i < step * 14),
    ].filter(range => !isEmpty(range))

    return (
      <div className="l-map">
        <Spinner
          isLoading={loading}
          className="-map"
        />
        <VizzMap
          mapOptions={mapState}
          events={mapEvents}
          bounds={bounds}
          basemap={basemap}
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
                {
                  layers
                  .reduce((acc, layer) => {
                    if (filters.scope === 'supply_chain' && filters.subscope === 'analyzer' && layer.id === 'ffc878aa-efb1-4258-bd40-2cf9fbfb6ddd') {
                      return [
                        ...acc,
                        ...ranges.map((range, index) => {
                          return {
                            ...layer,
                            id: layer.id + index.toString(),
                            layerConfig: {
                              ...layer.layerConfig,
                              body: {
                                ...layer.layerConfig.body,
                                layers: [
                                  {
                                    ...layer.layerConfig.body.layers[0],
                                    options: {
                                      ...layer.layerConfig.body.layers[0].options,
                                      sql: `SELECT s.aq30_id as cartodb_id, coalesce(NULLIF({{label}},''), 'No Data') as label, r.the_geom, r.the_geom_webmercator, (CASE WHEN {{label}} = 'Insignificant Trend' THEN -1 ELSE coalesce({{indicator}}, -9999)END) as water_risk FROM water_risk_indicators_annual s LEFT JOIN y2018m12d06_rh_master_shape_v01 r on s.aq30_id=r.aq30_id WHERE s.pfaf_id != -9999 and s.gid_1 != '-9999' and r.aqid != -9999 and {{value}} >= {{threshold}} and s.pfaf_id in {{watershed_ids}} ORDER BY s.aq30_id`
                                    }
                                  }
                                ]
                              },
                              params_config: [
                                ...layer.layerConfig.params_config,
                                { key: 'watershed_ids', required: true },
                              ],
                              sql_config: []
                            },
                            params: {
                              ...layer.params,
                              watershed_ids: `(${range.join(',')})`
                            }
                          }
                        })
                      ]
                    }
                    return [...acc, layer]
                  }, [])
                  .map((layer, i) => {
                    let l = { ...layer }
                    // if (filters.scope === 'supply_chain' && filters.subscope === 'analyzer' && l.id === 'ffc878aa-efb1-4258-bd40-2cf9fbfb6ddd') {
                    //   l = {
                    //     ...layer,
                    //     layerConfig: {
                    //       ...layer.layerConfig,
                    //       body: {
                    //         ...layer.layerConfig.body,
                    //         layers: [
                    //           {
                    //             ...layer.layerConfig.body.layers[0],
                    //             options: {
                    //               ...layer.layerConfig.body.layers[0].options,
                    //               sql: `SELECT s.aq30_id as cartodb_id, coalesce(NULLIF({{label}},''), 'No Data') as label, r.the_geom, r.the_geom_webmercator, (CASE WHEN {{label}} = 'Insignificant Trend' THEN -1 ELSE coalesce({{indicator}}, -9999)END) as water_risk FROM water_risk_indicators_annual s LEFT JOIN y2018m12d06_rh_master_shape_v01 r on s.aq30_id=r.aq30_id WHERE s.pfaf_id != -9999 and s.gid_1 != '-9999' and r.aqid != -9999 and {{value}} >= {{threshold}} and s.pfaf_id in {{watershed_ids}} ORDER BY s.aq30_id`
                    //             }
                    //           }
                    //         ]
                    //       },
                    //       params_config: [
                    //         ...layer.layerConfig.params_config,
                    //         { key: 'watershed_ids', required: true },
                    //       ],
                    //       sql_config: []
                    //     },
                    //     params: {
                    //       ...layer.params,
                    //       watershed_ids: `(${ranges[0].join(',')})`
                    //     }
                    //   }
                    // }
                    // console.log({ l, layer, layers, data, ranges })
                    return (
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
                    )
                  })
                }
              </LayerManager>

              {mapControls && (
                <MapControls>
                  <ZoomControl
                    zoom={mapState.zoom}
                    minZoom={mapState.minZoom}
                    maxZoom={mapState.maxZoom}
                    onZoomChange={(zoom) => { this.handleZoomChange(zoom); }}
                  />

                  <BasemapControl />

                  <ShareButton onClick={() => { this.toggleShareModal(); }} />
                  <DownloadMapControl mapElem={mapElem._mapPane} />
                </MapControls>
              )}


              {countries.length > 0 && (<MapHeader />)}

              {legend && layerGroup.length && (
                <div className="l-map-legend">
                  <VizzLegend
                    sortable={false}
                    maxHeight={350}
                  >
                    {layerGroup.map((_layerGroup, i) => (
                      <LegendListItem
                        index={i}
                        key={_layerGroup.dataset}
                        onChangeInfo={() => { this.openLayerInfo(_layerGroup); }}
                        onChangeOpacity={
                          (_layer, _opacity) => { this.handleLayerOpacity(_layer, _opacity); }
                        }
                        layerGroup={_layerGroup}
                        toolbar={(
                          <LegendItemToolbar>
                            <LegendItemButtonInfo />
                            {!_layerGroup.disableOpacity && (
                              <LegendItemButtonOpacity
                                trackStyle={{ backgroundColor: '#2E57B8' }}
                                handleStyle={{ backgroundColor: '#2E57B8' }}
                              />
                            )}
                          </LegendItemToolbar>
                        )}
                      >
                        <Legend
                          className="-map"
                          expanded
                          filters={filters}
                          layers={_layerGroup.layers}
                          onToggleInfo={this.toggleSourceModal}
                        />
                      </LegendListItem>
                    ))}
                  </VizzLegend>
                </div>
              )}
            </Fragment>
          )}
        </VizzMap>
      </div>
    );
  }
}

Map.propTypes = {
  mapState: PropTypes.object.isRequired,
  basemap: PropTypes.object.isRequired,
  bounds: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  parametrization: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  layerGroup: PropTypes.array.isRequired,
  mapControls: PropTypes.bool,
  legend: PropTypes.bool,
  foodLayers: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setMapLocation: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired
};

Map.defaultProps = {
  mapControls: true,
  legend: true
};

export default Map;

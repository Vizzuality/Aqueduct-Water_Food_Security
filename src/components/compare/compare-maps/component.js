import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MapControls, ZoomControl, Icon } from 'aqueduct-components';
import { Map as VizzMap } from 'vizzuality-components/dist/bundle';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';

// components
import LegendMobile from 'components/legend';

// constants
import {
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG
} from 'components/map/constants';

class CompareMaps extends PureComponent {
  render() {
    const { compareConfig } = this.props;
    console.log(this.props);

    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {compareConfig.map((_compareConfig) => {
            const { country, mapConfig, activeLayer } = _compareConfig || {};
            console.log('---')
            // console.log(activeLayer)
            // console.log(country)

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
                          {activeLayer.map((l, i) => (
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

CompareMaps.propTypes = { compareConfig: PropTypes.array.isRequired };

export default CompareMaps;

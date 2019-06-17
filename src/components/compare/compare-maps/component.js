import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import zipObject from 'lodash/zipObject';
import { MapControls, ZoomControl, Icon } from 'aqueduct-components';
import { Map as VizzMap } from 'vizzuality-components/dist/bundle';
import { LayerManager, Layer } from 'layer-manager/dist/components';

// components
import LegendMobile from 'components/legend';
// import LayerManager from 'utils/layers/LayerManager';

// constants
import {
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG,
  MAP_OPTIONS
} from 'components/map/constants';

class CompareMaps extends PureComponent {
  // constructor(props) {
  //   super(props);

  //   this.state = { maps: [] };

  //   // this.state = {
  //   //   maps: zipObject(props.countries, [MAP_CONFIG, MAP_CONFIG])
  //   // };
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (!isEqual(nextProps.countries, this.props.countries)) {
  //     this.setState({
  //       maps: zipObject(nextProps.countries, [MAP_CONFIG, MAP_CONFIG])
  //     });
  //   }
  // }


  render() {
    const { compareConfig } = this.props;
    console.log(this.props);


    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {compareConfig.map((_compareConfig) => {
            const { country, mapConfig } = _compareConfig;

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

            // const filters = Object.assign({}, this.props.filters, {
            //   country,
            //   countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            // });

            // const layersActive = this.props.layersActive.map(l => Object.assign({}, l, {
            //   country,
            //   countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            // }));

            // const mapConfig = Object.assign({}, this.state.maps[country].mapConfig, { bounds: this.props.countryList.find(c => c.id === country) })

            return (
              <div key={country} className="compareitem-column">
                <div className="compareitem-map">
                  <VizzMap
                    mapOptions={mapConfig}
                    // events={mapEvents}
                    bounds={mapConfig.bounds}
                    basemap={BASEMAP_LAYER_CONFIG}
                    label={LABEL_LAYER_CONFIG}
                    // mapConfig={mapConfig}
                    // filters={filters}
                    // layersActive={layersActive}
                    // LayerManager={LayerManager}
                    // setMapParams={(newMapConfig) => {
                    //   this.setState({
                    //     [country]: {
                    //       mapConfig: {
                    //         ...mapConfig,
                    //         ...newMapConfig
                    //       }
                    //     }
                    //   });
                    // }}
                  />
                  {/* Map controls */}
                  {/* <MapControls className="-left">
                    <LegendMobile />
                  </MapControls> */}

                  {/* Map controls */}
                  {/* <MapControls>
                    <ZoomControl
                      zoom={mapConfig.zoom}
                      onZoomChange={(zoom) => {
                        this.setState({
                          [country]: {
                            mapConfig: {
                              ...mapConfig,
                              zoom
                            }
                          }
                        });
                      }}
                    />
                  </MapControls> */}
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
  context: PropTypes.string,
  countryList: PropTypes.array,
  country: PropTypes.string,
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array
};

export default CompareMaps;

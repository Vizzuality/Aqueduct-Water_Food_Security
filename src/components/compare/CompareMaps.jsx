import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import zipObject from 'lodash/zipObject';


import { Map, MapControls, ZoomControl, Icon } from 'aqueduct-components';
import LegendMobile from 'components/legend';
import LayerManager from 'utils/layers/LayerManager';

const MAP_CONFIG = {
  mapConfig: {
    zoom: 3,
    latLng: {
      lat: 0,
      lng: 0
    }
  }
};

export default class CompareMaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maps: zipObject(props.countries, [MAP_CONFIG, MAP_CONFIG])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.countries, this.props.countries)) {
      this.setState({
        maps: zipObject(nextProps.countries, [MAP_CONFIG, MAP_CONFIG])
      });
    }
  }


  render() {
    const { mapConfig } = this.state;

    const items = Array.from(Array(this.props.items));

    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {items.map((item, i) => {
            const country = this.props.countries[i];

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

            const filters = Object.assign({}, this.props.filters, {
              country,
              countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            });

            const layersActive = this.props.layersActive.map(l => Object.assign({}, l, {
              country,
              countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            }));

            const mapConfig = Object.assign({}, this.state.maps[country].mapConfig, { bounds: this.props.countryList.find(c => c.id === country) })

            return (
              <div key={country} className="compareitem-column">
                <div className="compareitem-map">
                  <Map
                    mapConfig={mapConfig}
                    filters={filters}
                    layersActive={layersActive}
                    LayerManager={LayerManager}
                    setMapParams={(newMapConfig) => {
                      this.setState({
                        [country]: {
                          mapConfig: {
                            ...mapConfig,
                            ...newMapConfig
                          }
                        }
                      });
                    }}
                  />
                  {/* Map controls */}
                  <MapControls className="-left">
                    <LegendMobile />
                  </MapControls>

                  {/* Map controls */}
                  <MapControls>
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
                  </MapControls>
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
  loading: PropTypes.bool,
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array
};

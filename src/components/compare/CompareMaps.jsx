import React from 'react';
import PropTypes from 'prop-types';

import { Map, MapControls, ZoomControl, Icon } from 'aqueduct-components';
import LegendMobile from 'components/legend/LegendMobile';
import LayerManager from 'utils/layers/LayerManager';

export default class CompareMaps extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.countries);

    this.state = {
      [props.countries[0]]: {
        mapConfig: {
          zoom: 3,
          latLng: {
            lat: 0,
            lng: 0
          }
        }
      },
      [props.countries[1]]: {
        mapConfig: {
          zoom: 3,
          latLng: {
            lat: 0,
            lng: 0
          }
        }
      }
    };
  }

  render() {
    const { mapConfig } = this.state;

    const emptyPlaceholder = (
      <div className="country-placeholder">
        <div>
          <Icon className="-huge country-placeholder-icon" name="icon-country" />
          <p className="country-placeholder-text">Choose a country first</p>
        </div>
      </div>
    );

    const showMap = (!this.props.context || (this.props.context && this.props.context === 'map'));
    const showWidgets = this.props.country && (!this.props.context || (this.props.context && this.props.context === 'data'));

    const items = Array.from(Array(this.props.items));

    return (
      <div className="c-compareitem-maps">
        <div className="c-compareitem-row">
          {items.map((item, i) => {
            const country = this.props.countries[i];

            const filters = Object.assign({}, this.props.filters, {
              country,
              countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            });

            const layersActive = this.props.layersActive.map(l => Object.assign({}, l, {
              country,
              countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            }));

            const mapConfig = Object.assign({}, this.state[country].mapConfig, { bounds: this.props.countryList.find(c => c.id === country) })

            return (
              <div className="compareitem-column">
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
                    <LegendMobile
                      filters={filters}
                      layers={layersActive}
                    />
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

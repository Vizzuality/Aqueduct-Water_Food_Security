import React from 'react';
import PropTypes from 'prop-types';
import { Map, MapControls, ZoomControl, SegmentedUi } from 'aqueduct-components';
import WidgetList from 'components/widgets/WidgetList';
import MobileFilters from 'components/filters/mobile';
import DownloadButton from 'components/map/map-controls/download-map';
import LegendMobile from 'components/legend/LegendMobile';
import Summary from 'components/summary/Summary';
import LayerManager from 'utils/layers/LayerManager';

export default class MapPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: 'data'
    };
  }

  setMapElement(mapElem) {
    if (this.state.mapElem) return;

    this.setState({
      mapElem
    });
  }

  render() {
    const pageContextOptions = [{ label: 'Data', value: 'data' }, { label: 'Map', value: 'map' }];
    const mapConfig = Object.assign({}, this.props.mapConfig, { scrollWheelZoom: true });
    if (this.props.filters.scope === 'country' && this.props.filters.country) {
      // Obtain country geom
      mapConfig.bounds = this.props.countries.list.find(c => c.id === this.props.filters.country);
    }
    return (
      <div className="mobile-map-wrapper">
        <div className="mobile-btns-wrapper">
          <SegmentedUi
            className="-btns"
            items={pageContextOptions}
            selected={this.state.context}
            onChange={selected => this.setState({ context: selected.value })}
          />
        </div>
        {/* Widget list */}
        {this.state.context === 'data' &&
          <div className="mobile-widgets-container">
            {this.props.filters.scope === 'country' && this.props.filters.country &&
              <Summary filters={this.props.filters} countries={this.props.countries.list} />
            }
            <WidgetList filters={this.props.filters} widgetsActive={this.props.widgetsActive} />
          </div>
        }
        {/* Map */}
        {this.state.context === 'map' &&
          <div className="l-map-mobile">
            <div className="c-map-container" ref={(el) => { this.setMapElement(el); }}>
              <Map
                mapConfig={mapConfig}
                filters={this.props.filters}
                layersActive={this.props.layersActive}
                setMapParams={this.props.setMapParams}
                sidebar={this.props.sidebar}
                LayerManager={LayerManager}
              />
              {/* Map controls */}
              <MapControls className="-left">
                <LegendMobile
                  layers={this.props.layersActive}
                  filters={this.props.filters}
                />
              </MapControls>

              {/* Map controls */}
              <MapControls>
                <ZoomControl
                  zoom={this.props.mapConfig.zoom}
                  onZoomChange={(zoom) => {
                    this.props.setMapParams({
                      ...this.props.mapConfig,
                      ...{ zoom }
                    });
                  }}
                />
                {/* <DownloadButton className="download-map-btn" mapElem={this.state.mapElem} /> */}
              </MapControls>
            </div>
          </div>
        }
        {/* Filters */}
        <MobileFilters
          className="-mobile"
          withScope
        />
      </div>
    );
  }
}

MapPageMobile.propTypes = {
  mapConfig: PropTypes.object,
  filters: PropTypes.object,
  sidebar: PropTypes.object,
  layersActive: PropTypes.array,
  widgetsActive: PropTypes.array,
  countries: PropTypes.object,
  // Actions
  setMapParams: PropTypes.func,
  setFilters: PropTypes.func
};

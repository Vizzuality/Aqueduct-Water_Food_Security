import React from 'react';
import { dispatch } from 'main';

// Components
import Sidebar from 'containers/ui/Sidebar';
import Sticky from 'components/ui/Sticky';
import Filters from 'components/filters/Filters';
import StickyFilters from 'components/filters/StickyFilters';
import WidgetList from 'components/widgets/WidgetList';
import Summary from 'components/summary/Summary';

import DownloadButton from 'components/map/DownloadButton';
import ShareButton from 'components/map/ShareButton';
import Legend from 'containers/legend/Legend';
import LayerManager from 'utils/layers/LayerManager';
import { Map, MapControls, ZoomControl, MapHeader } from 'aqueduct-components';
import { cropOptions, irrigationOptions, scopeOptions, waterOptions } from 'constants/filters';

export default class MapPageDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };
  }

  componentWillMount() {
    this.props.updateMapUrl();
  }

  componentDidMount() {
    this.setStickyFilterPosition();
  }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  onSticky(isSticky) {
    this.setState({
      showStickyFilters: isSticky
    });
  }

  setMapElement(mapElem) {
    if (this.state.mapElem) return;

    this.setState({
      mapElem
    });
  }

  getDictionary() {
    const _iso = this.props.filters.country;
    const _scope = this.props.filters.scope;
    const _countries = this.props.countries.list;

    return {
      crop(crop) {
        return (crop !== 'all') ? cropOptions.find(v => v.value === crop).label : '';
      },
      country(iso) {
        if (!iso || _scope === 'global') return '';

        const countryName = _countries.find(c => c.id === iso).name;
        // be careful with names ending in 's'
        return `${countryName}'s`;
      },
      irrigation(irrigation) {
        if (!irrigation.length) {
          return irrigationOptions.map(r => r.label).join(' & ');
        }

        return irrigation.map((val) => {
          return irrigationOptions.find(v => v.value === val).label;
        }).join(' & ');
      },
      scope(scope) {
        return !_iso || scope === 'global' ? scopeOptions.find(v => v.value === 'global').label : '';
      },
      indicator(indicator) {
        return indicator !== 'none' ? waterOptions.find(v => v.value === indicator).label : '';
      }
    };
  }

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  getMapHeaderTemplate() {
    return '{{scope}} {{country}} {{indicator}} {{irrigation}} {{crop}} Producing Areas';
  }

  render() {
    const mapConfig = Object.assign({}, this.props.mapConfig, { scrollWheelZoom: true });

    if (this.props.filters.scope === 'country' && this.props.filters.country) {
      // Obtain country geom
      mapConfig.bounds = this.props.countries.list.find(c => c.id === this.props.filters.country);
    }

    return (
      <div className="l-map -fullscreen">
        {/* Sidebar */}
        <Sidebar>
          {/* Filters */}
          <div className="l-filters" ref={(elem) => { this.filtersElem = elem; }}>
            <Filters
              className="-sidebar"
              filters={this.props.filters}
              setFilters={this.props.setFilters}
              withScope
            />
          </div>
          <Sticky
            className="-filter"
            topLimit={this.state.stickyFilterTopPosition}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-sidebar-content"
          >
            {
              this.state.showStickyFilters &&
                <StickyFilters
                  filters={this.props.filters}
                  setFilters={this.props.setFilters}
                  withScope
                />
            }
          </Sticky>
          {/* Widget List */}
          <div className="l-sidebar-content">
            {this.props.filters.scope === 'country' && this.props.filters.country &&
              <Summary filters={this.props.filters} countries={this.props.countries.list} />
            }
            <WidgetList filters={this.props.filters} widgetsActive={this.props.widgetsActive} />
          </div>
        </Sidebar>

        {/* Map */}
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

            {/* Download button */}
            <DownloadButton
              mapElem={this.state.mapElem}
            />
            {/* Share button */}
            <ShareButton />

          </MapControls>

          { /* Map headings */}
          {this.props.countries.list.length &&
            <MapHeader
              dictionary={this.getDictionary()}
              filters={this.props.filters}
              template={this.getMapHeaderTemplate()}
            />}

          { /* Map legend */}
          <Legend
            className="-map"
            expanded
            layers={this.props.layersActive}
          />
        </div>
      </div>
    );
  }
}

MapPageDesktop.propTypes = {
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  countries: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  widgetsActive: React.PropTypes.array,
  // Actions
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func
};

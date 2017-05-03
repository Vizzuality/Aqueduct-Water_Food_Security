import React from 'react';

// Components
import WidgetList from 'components/widgets/WidgetList';
import Summary from 'components/summary/Summary';

import LayerManager from 'utils/layers/LayerManager';
import { SCOPE_OPTIONS, WATER_OPTIONS } from 'constants/filters';

import {
  Map,
  Legend,
  MapHeader,
  CROP_OPTIONS,
  IRRIGATION_OPTIONS
} from 'aqueduct-components';

export default class MapPageDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.updateMapUrl();
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
        return (crop !== 'all') ? CROP_OPTIONS.find(v => v.value === crop).label : '';
      },
      country(iso) {
        if (!iso || _scope !== 'country') return '';

        const countryName = _countries.find(c => c.id === iso).name;
        // be careful with names ending in 's'
        return `${countryName}'s`;
      },
      irrigation(irrigation) {
        if (!irrigation.length) {
          return IRRIGATION_OPTIONS.map(r => r.label).join(' & ');
        }

        return irrigation.map((val) => {
          return IRRIGATION_OPTIONS.find(v => v.value === val).label;
        }).join(' & ');
      },
      scope(scope) {
        return !_iso || scope !== 'country' ? SCOPE_OPTIONS.find(v => v.value === 'global').label : '';
      },
      indicator(indicator) {
        return indicator !== 'none' ? WATER_OPTIONS.find(v => v.value === indicator).label : '';
      }
    };
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
      <div className="c-report">
        {/* Summary & WidgetList */}
        {this.props.filters.scope === 'country' && this.props.filters.country &&
          <Summary filters={this.props.filters} countries={this.props.countries.list} />
        }
        <WidgetList
          // grid="small-6"
          filters={this.props.filters}
          widgetsActive={this.props.widgetsActive}
        />

        {/* Map */}
        <div className="c-map-container -relative" ref={(el) => { this.setMapElement(el); }}>
          <Map
            mapConfig={mapConfig}
            filters={this.props.filters}
            layersActive={this.props.layersActive}
            setMapParams={this.props.setMapParams}
            sidebar={this.props.sidebar}
            LayerManager={LayerManager}
          />

          { /* Map headings */}
          {this.props.countries.list.length &&
            <MapHeader
              dictionary={this.getDictionary()}
              filters={this.props.filters}
              template={this.getMapHeaderTemplate()}
            />
          }

          { /* Map legend */}
          <Legend
            className="-map"
            expanded
            filters={this.props.filters}
            layers={this.props.layersActive}
            onToggleInfo={this.toggleSourceModal}
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
  updateMapUrl: React.PropTypes.func
};

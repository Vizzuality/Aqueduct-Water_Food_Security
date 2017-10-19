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
  // Constants
  CROP_OPTIONS,
  IRRIGATION_OPTIONS,
  // Functions
  post
} from 'aqueduct-components';

export default class MapPageDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.triggerDownload = this.triggerDownload.bind(this);
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
        if (irrigation === 'all') {
          return IRRIGATION_OPTIONS.filter(v => v.value !== 'all').map(v => v.label).join(' & ');
        }

        return IRRIGATION_OPTIONS.find(v => v.value === irrigation).label;
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

  triggerDownload() {
    // Print: first aproach
    window.print();

    // Download: second aproach
    // post({
    //   type: 'POST',
    //   url: '/download-pdf',
    //   headers: [{
    //     key: 'Content-Type',
    //     value: 'application/json'
    //   }],
    //   body: {
    //     html: document.documentElement.innerHTML
    //   },
    //   onSuccess: (data) => {
    //     console.info(data);
    //   },
    //   onError: (error) => {
    //     console.info(error);
    //   }
    // });
  }

  render() {
    const mapConfig = Object.assign({}, this.props.mapConfig, { scrollWheelZoom: false });

    if (this.props.filters.scope === 'country' && this.props.filters.country) {
      // Obtain country geom
      mapConfig.bounds = this.props.countries.list.find(c => c.id === this.props.filters.country);
    }

    return (
      <div id="l-report" className="l-report c-report">
        <div className="content">

          <header>
            <h2 className="report-title">Aqueduct Food report</h2>
          </header>

          {/* Summary & WidgetList */}
          {this.props.filters.scope === 'country' && this.props.filters.country &&
            <Summary filters={this.props.filters} countries={this.props.countries.list} />
          }
          <WidgetList
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
          </div>
          { /* Map legend */}
          <Legend
            className="-map"
            expanded
            filters={this.props.filters}
            layers={this.props.layersActive}
            onToggleInfo={this.toggleSourceModal}
          />
        </div>

        <button
          className="c-btn -primary -light no-print"
          style={{
            position: 'fixed',
            zIndex: 10000,
            bottom: 20,
            right: 20
          }}
          onClick={this.triggerDownload}
        >
          Download
        </button>
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

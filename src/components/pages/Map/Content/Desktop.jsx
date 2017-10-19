import React from 'react';
import { dispatch } from 'main';
import capitalize from 'lodash/capitalize';

// Components
import Sidebar from 'containers/ui/Sidebar';
import Filters from 'components/filters/Filters';
import StickyFilters from 'components/filters/StickyFilters';
import WidgetList from 'components/widgets/WidgetList';
import Summary from 'components/summary/Summary';

import ShareModal from 'containers/modal/ShareModal';

// Layer Manager
import LayerManager from 'utils/layers/LayerManager';
import { SCOPE_OPTIONS, WATER_OPTIONS } from 'constants/filters';

// Controls
import DownloadMapControl from 'components/map/DownloadMapControl';

import {
  Map,
  Legend,
  MapControls,
  SourceModal,
  ShareButton,
  Sticky,
  ZoomControl,
  MapHeader,
  toggleModal,
  CROP_OPTIONS,
  IRRIGATION_OPTIONS
} from 'aqueduct-components';

export default class MapPageDesktop extends React.Component {

  // MODAL EVENTS
  static toggleShareModal() {
    dispatch(toggleModal(true, {
      children: ShareModal
    }));
  }

  static toggleSourceModal(layer) {
    dispatch(toggleModal(true, {
      children: SourceModal,
      childrenProps: layer
    }));
  }

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };

    // BINDINGS
    this.toggleShareModal = MapPageDesktop.toggleShareModal.bind(this);
    this.toggleSourceModal = MapPageDesktop.toggleSourceModal.bind(this);
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

  getMapHeaderTemplate() {
    const { scope, crop, year, type, indicator, food, irrigation, countryName } = this.props.filters;
    const existsIndicator = indicator !== 'none';
    const existsFood = food !== 'none';
    const typeString = type === 'change_from_baseline' ? 'Change in Baseline' : capitalize(type);
    const foodDatasetName = existsFood ? (this.props.datasets.find(dataset => dataset.id === food) || {}).name : null;
    const waterDatasetName = existsIndicator ? (this.props.datasets.find(dataset => dataset.id === indicator) || {}).name : null;
    const cropName = crop !== 'all' ? (CROP_OPTIONS.find(cr => cr.value === crop) ||{}).label : null;
    const irrigationString = irrigation.map(irr => capitalize(irr)).join('/');
    const isWaterStress = indicator === '4b000ded-5f4d-4dbd-83c9-03f2dfcd36db';
    const isSeasonalVariability = indicator === 'd9785282-2140-463f-a82d-f7296687055a';

    // Global, all crops, baseline
    if (scope === 'global' && crop === 'all' && year === 'baseline') {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `Global ${capitalize(irrigationString)} Crop Producing Areas`;
      }

      // water dataset selected
      if (existsIndicator && !existsFood) {
        return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas`;
      }

      // food and water datasets are selected
      if (existsFood && existsIndicator) {
        return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas & ${foodDatasetName}`;
      }

      // food dataset is selected
      if (existsFood && !existsIndicator) {
        return `Global ${irrigationString} Crop Producing Areas & ${foodDatasetName}`;
      }

      // "all crops" is selected
      return 'Global Irrigated & Rainfed Crop Producing Areas';
    }

    // Global, one crop, baseline
    if (scope === "global" && crop !== 'all' && year === 'baseline') {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `Global ${capitalize(irrigationString)} ${cropName} Producing Areas`;
      }

      // water dataset selected
      if (existsIndicator && !existsFood) {
        return `Global Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas`;
      }

      // food and water datasets are selected
      if (existsFood && existsIndicator) {
        return `Global Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName}`;
      }

      // food dataset is selected
      if (existsFood && !existsIndicator) {
        return `Global ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName}`;
      }

      return `Global Irrigated & Rainfed ${cropName} Producing Areas`;
    }

    // Global, all crops, [change in] future year
    if (scope === "global" && crop === 'all' && year !== 'baseline') {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `Global ${capitalize(irrigationString)} Crop Producing Areas`;
      }

      // water risk indicators of water stress or seasonal variability are selected
      if ((isWaterStress || isSeasonalVariability) && !existsFood) {
        return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas`;
      }

      // water risk indicators of water stress or seasonal variability and a food security dataset is selected
      if ((isWaterStress || isSeasonalVariability) && existsFood) {
        return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString}
          Crop Producing Areas & ${year} ${foodDatasetName}`;
      }

      // food security dataset is selected and indicator (not water stress or seasonal variability)
      if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
        return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
          Projected ${year} ${foodDatasetName}`;
      }

      // food security dataset are selected but no water risk indicator
      if (existsFood && !existsIndicator) {
        return `Global ${irrigationString} Crop Producing Areas & Projected ${year} ${foodDatasetName}`;
      }

      // only “all crops” is selected
      return "Global Irrigated & Rainfed Crop Producing Areas";
    }

    // Global, one crops, [change in] future year
    if (scope === "global" && crop !== 'all' && year !== 'baseline') {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `Global ${capitalize(irrigationString)} ${cropName} Producing Areas`;
      }

      // water risk indicators of water stress or seasonal variability are selected
      if ((isWaterStress || isSeasonalVariability) && !existsFood) {
        return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName} Producing Areas`;
      }

      // water risk indicators of water stress or seasonal variability and a food security dataset is selected
      if ((isWaterStress || isSeasonalVariability) && existsFood) {
        return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString}
        ${cropName} Producing Areas & ${year} ${foodDatasetName}`;
      }

      // food security dataset are selected but no water risk indicator
      if (existsFood && !existsIndicator) {
        return `Global ${irrigationString} ${cropName} Producing Areas & Projected ${year} ${foodDatasetName}`;
      }

      // only “all crops” is selected
      return `Global Irrigated & Rainfed ${cropName} Producing Areas`;
    }

    // Country, all crops, baseline
    if (scope === 'country' && crop === 'all' && year === 'baseline' && countryName) {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `${capitalize(irrigationString)} Crop Producing Areas in ${countryName}`;
      }

      // any water dataset selected
      if (existsIndicator && !existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas in ${countryName}`;
      }

      // food and water datasets are selected
      if (existsFood && existsIndicator) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas & ${foodDatasetName} in ${countryName}`;
      }

      // food dataset is selected
      if (existsFood && !existsIndicator) {
        return `${irrigationString} Crop Producing Areas & ${foodDatasetName} in ${countryName}`;
      }

      return `Irrigated & Rainfed Crop Producing Areas in ${countryName}`;
    }

    // Country, one crop, baseline
    if (scope === 'country' && crop !== 'all' && year === 'baseline' && countryName) {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `${capitalize(irrigationString)} ${cropName} Producing Areas in ${countryName}`;
      }

      // water dataset selected
      if (existsIndicator && !existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas in ${countryName}`;
      }

      // food and water datasets are selected
      if (existsFood && existsIndicator) {
        return `Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName} in ${countryName}`;
      }

      // food dataset is selected
      if (existsFood && !existsIndicator) {
        return `${irrigationString} ${cropName} Producing Areas & ${foodDatasetName} in ${countryName}`;
      }

      // food security dataset is selected and indicator (not water stress or seasonal variability)
      if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
          Projected ${year} ${foodDatasetName}`;
      }

      // only “all crops” is selected
      return `Irrigated & Rainfed ${cropName} Producing Areas in ${countryName}`;
    }

    // Country, all crops, [change in] future year
    if (scope === 'country' && crop === 'all' && year !== 'baseline' && countryName) {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `${capitalize(irrigationString)} Crop Producing Areas in ${countryName}`;
      }

      // water risk indicators of water stress or seasonal variability are selected
      if ((isWaterStress || isSeasonalVariability) && !existsFood) {
        return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas in ${countryName}`;
      }

      // any other water risk indicator (not water stress nor seasonal variability)
      if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && !existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas in ${countryName}`;
      }

      // water stress or seasonal variability selected and food selected
      if ((isWaterStress || isSeasonalVariability) && existsFood) {
        return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas
          & ${year} ${foodDatasetName} in ${countryName}`;
      }

      // food security dataset is selected and indicator (not water stress or seasonal variability)
      if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
          Projected ${year} ${foodDatasetName} in ${countryName}`;
      }

      // food security dataset is selected but no water risk indicator
      if (existsFood && !existsIndicator) {
        return `${irrigationString} Crop Producing Areas & Projected ${year} ${foodDatasetName} in ${countryName}`
      }

      // only “all crops” is selected
      return `Irrigated & Rainfed Crop Producing Areas in ${countryName}`;
    }

    // Country, all crops, [change in] future year
    if (scope === 'country' && crop !== 'all' && year !== 'baseline' && countryName) {

      // only "irrigated" or "rainfed" is selected
      if(!existsIndicator && !existsFood && irrigation.length === 1) {
        return `${capitalize(irrigationString)} ${cropName} Producing Areas in ${countryName}`;
      }

      // water stress or seasonal variability selected (not food dataset)
      if ((isWaterStress || isSeasonalVariability) && !existsFood) {
        return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName}
          Producing Areas in ${countryName}`;
      }

      // water risk indicators of water stress or seasonal variability and a food security dataset is selected
      if ((isWaterStress || isSeasonalVariability) && existsFood) {
        return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName}
          Producing Areas & ${year} ${foodDatasetName} in ${countryName}`;
      }

      // food security dataset is selected and indicator (not water stress or seasonal variability)
      if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
        return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
          Projected ${year} ${foodDatasetName}`;
      }

      // food security dataset are selected but no water risk indicator
      if (existsFood && !existsIndicator) {
        return `${irrigationString} ${cropName} Producing Areas & Projected ${year} ${foodDatasetName} in ${countryName}`
      }

      // only crop is selected
      return `Irrigated & Rainfed ${cropName} Producing Areas in ${countryName}`;
    }

    return null;
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

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
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

          {/* Sticky Filters */}
          <Sticky
            topLimit={this.state.stickyFilterTopPosition}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-sidebar-content"
          >
            {this.state.showStickyFilters &&
              <StickyFilters
                className="-country"
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

            {/* Share button */}
            <ShareButton
              onClick={this.toggleShareModal}
            />

            {/* Download button */}
            <DownloadMapControl
              mapElem={this.state.mapElem}
            />
          </MapControls>

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
  datasets: React.PropTypes.array,
  countries: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  widgetsActive: React.PropTypes.array,
  // Actions
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func
};

import React from 'react';
import Map from 'components/map/Map';
import SegmentedUi from 'components/ui/SegmentedUi';
import WidgetList from 'components/widgets/WidgetList';
import MobileFilters from 'components/filters/MobileFilters';
import LegendMobile from 'containers/legend/LegendMobile';

export default class MapPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: 'data'
    };
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
            <WidgetList filters={this.props.filters} widgetsActive={this.props.widgetsActive} />
          </div>
        }
        {/* Map */}
        {this.state.context === 'map' &&
          <div className="l-map-mobile">
            <LegendMobile layersActive={this.props.layersActive} />
            <div className="c-map-container">
              <Map mapConfig={mapConfig} filters={this.props.filters} layersActive={this.props.layersActive} setMapParams={this.props.setMapParams} sidebar={this.props.sidebar} />
            </div>
          </div>
        }
        {/* Filters */}
        <MobileFilters
          className="-mobile"
          withScope filters={this.props.filters}
          setFilters={this.props.setFilters}
          toggleModal={this.props.toggleModal}
        />
      </div>
    );
  }
}

MapPageMobile.propTypes = {
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  widgetsActive: React.PropTypes.array,
  countries: React.PropTypes.object,
  // Actions
  setMapParams: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  toggleModal: React.PropTypes.func
};

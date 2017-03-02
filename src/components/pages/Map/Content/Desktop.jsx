import React from 'react';

// Components
import Sidebar from 'containers/ui/Sidebar';
import Sticky from 'components/ui/Sticky';
import Filters from 'components/filters/Filters';
import StickyFilters from 'components/filters/StickyFilters';
import WidgetList from 'components/widgets/WidgetList';
import Summary from 'components/summary/Summary';
import Legend from 'containers/legend/Legend';
import ShareModal from 'containers/modal/ShareModal';
import LayerManager from 'utils/layers/LayerManager';
import { Map, Icon } from 'aqueduct-components';

export default class MapPageDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };

    // BINDINGS
    this.toggleShareModal = this.toggleShareModal.bind(this);
  }

  componentWillMount() {
    this.props.updateMapUrl();
  }

  onSticky(isSticky) {
    this.setState({
      showStickyFilters: isSticky
    });
  }

  toggleShareModal() {
    this.props.toggleModal(true, {
      children: ShareModal
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
          {/* Share button */}
          <button type="button" className="-white -with-icon btn-share" onClick={this.toggleShareModal}>
            <Icon className="-medium" name="icon-share" />
            Share
          </button>
          {/* Filters */}
          <div className="l-filters">
            <Filters
              className="-sidebar"
              filters={this.props.filters}
              setFilters={this.props.setFilters}
              toggleModal={this.props.toggleModal}
              withScope
            />
          </div>
          <Sticky
            className="-filter"
            topLimit={373}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-sidebar-content"
          >
            {this.state.showStickyFilters &&
              <StickyFilters />}
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
        <div className="c-map-container">
          <Map
            mapConfig={mapConfig}
            filters={this.props.filters}
            layersActive={this.props.layersActive}
            setMapParams={this.props.setMapParams}
            sidebar={this.props.sidebar}
            LayerManager={LayerManager}
          />
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
  setFilters: React.PropTypes.func,
  toggleModal: React.PropTypes.func
};

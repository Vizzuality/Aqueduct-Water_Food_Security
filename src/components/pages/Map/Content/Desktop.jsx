import React from 'react';

// Components
import Sidebar from 'containers/ui/Sidebar';
import Sticky from 'components/ui/Sticky';
import Filters from 'components/filters/Filters';
import StickyFilters from 'components/filters/StickyFilters';
import WidgetList from 'components/widgets/WidgetList';
import Summary from 'components/summary/Summary';
import DownloadButton from 'components/map/DownloadButton';
import Legend from 'containers/legend/Legend';
import DynamicHeader from 'components/map/DynamicHeader';
import ShareModal from 'containers/modal/ShareModal';
import LayerManager from 'utils/layers/LayerManager';
import { Map, Icon, MapControls } from 'aqueduct-components';
import { toggleModal } from 'reducers/modal';

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

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  toggleShareModal() {
    toggleModal(true, {
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
          <MapControls
            zoom={this.props.mapConfig.zoom}
            onZoomChange={(zoom) => {
              this.props.setMapParams({
                ...this.props.mapConfig,
                ...{ zoom }
              });
            }}
            actions={[{
              component: DownloadButton,
              componentProps: {
                className: 'download-map-btn',
                mapElem: this.state.mapElem
              }
            }]}
          />

          { /* Map headings */}
          {this.props.countries.list.length &&
            <DynamicHeader
              countries={this.props.countries.list}
              filters={this.props.filters}
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

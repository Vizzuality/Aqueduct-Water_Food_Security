import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';

// Components
import Map from 'components/map';
import Sidebar from 'containers/ui/Sidebar';
import Filters from 'components/filters';
import StickyFilters from 'components/filters/sticky';
import WidgetList from 'components/widgets/widget-list';
import Summary from 'components/summary/Summary';

import ShareModal from 'containers/modal/ShareModal';

// Controls
import DownloadMapControl from 'components/map/map-controls/download-map';

import {
  SourceModal,
  Sticky,
  toggleModal,
} from 'aqueduct-components';

export default class MapPageDesktop extends PureComponent {

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

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  render() {
    return (
      <div className="l-map -fullscreen">
        {/* Sidebar */}
        <Sidebar>
          {/* Filters */}
          <div className="l-filters" ref={(elem) => { this.filtersElem = elem; }}>
            <Filters
              className="-sidebar"
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
                withScope
              />
            }
          </Sticky>

          {/* Widget List */}
          <div className="l-sidebar-content">
            {this.props.filters.scope === 'country' && this.props.filters.country &&
              <Summary filters={this.props.filters} countries={this.props.countries.list} />
            }
            <WidgetList />
          </div>
        </Sidebar>

        {/* Map */}
        <div className="c-map-container">
          <Map />
        </div>
      </div>
    );
  }
}

MapPageDesktop.propTypes = {
  mapConfig: PropTypes.object,
  filters: PropTypes.object,
  datasets: PropTypes.array,
  countries: PropTypes.object,
  sidebar: PropTypes.object,
  layersActive: PropTypes.array,
  widgetsActive: PropTypes.array,
  // Actions
  setMapParams: PropTypes.func,
  updateMapUrl: PropTypes.func,
  setFilters: PropTypes.func
};

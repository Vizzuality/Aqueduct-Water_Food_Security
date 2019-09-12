import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'aqueduct-components';

// components
import Map from 'components/map';
import Sidebar from 'components/sidebar';
import Filters from 'components/filters';
import StickyFilters from 'components/filters/sticky';
import WidgetList from 'components/widgets/widget-list';
import Summary from 'components/summary';
// import DownloadMapControl from 'components/map/map-controls/download-map';

class MapPageDesktop extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { showStickyFilters: false };
  }

  componentDidMount() {
    this.setStickyFilterPosition();
  }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  onSticky(isSticky) {
    this.setState({ showStickyFilters: isSticky });
  }

  setStickyFilterPosition() {
    const { stickyFilterTopPosition } = this.state;
    const newStickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (stickyFilterTopPosition === newStickyFilterTopPosition) return;

    this.setState({ stickyFilterTopPosition: newStickyFilterTopPosition });
  }

  render() {
    const { filters } = this.props;
    const { stickyFilterTopPosition, showStickyFilters } = this.state;

    return (
      <div className="l-map -fullscreen">
        {/* Sidebar */}
        <Sidebar>
          {/* Filters */}
          <div
            className="l-filters"
            ref={(elem) => { this.filtersElem = elem; }}
          >
            <Filters
              className="-sidebar"
              withScope
              {...this.props}
            />
          </div>

          {/* Sticky Filters */}
          <Sticky
            topLimit={stickyFilterTopPosition}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-sidebar-content"
          >
            {showStickyFilters && (
              <StickyFilters
                className="-country"
                withScope
              />
            )}
          </Sticky>

          {/* Widget List */}
          <div className="l-sidebar-content">
            {filters.scope === 'country' && filters.country && (
              <Summary />
            )}
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
  filters: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired
};

export default MapPageDesktop;

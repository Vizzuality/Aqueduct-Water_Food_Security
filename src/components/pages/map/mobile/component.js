import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MapControls, SegmentedUi } from 'aqueduct-components';

// components
import Map from 'components/map';
import WidgetList from 'components/widgets/widget-list';
import MobileFilters from 'components/filters/mobile';
import LegendMobile from 'components/legend';
import Summary from 'components/summary';

// constants
import { PAGE_CONTEXT_OPTIONS } from './constants';

class MapPageMobile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { context: 'data' };
  }

  render() {
    const { context } = this.state;
    const {
      filters,
      countries
    } = this.props;

    return (
      <div className="mobile-map-wrapper">
        <div className="mobile-btns-wrapper">
          <SegmentedUi
            className="-btns"
            items={PAGE_CONTEXT_OPTIONS}
            selected={context}
            onChange={selected => this.setState({ context: selected.value })}
          />
        </div>
        {/* Widget list */}
        {context === 'data' && (
          <div className="mobile-widgets-container">
            {filters.scope === 'country' && filters.country && (
              <Summary />
            )}
            <WidgetList />
          </div>
        )}
        {/* Map */}
        {context === 'map' && (
          <div className="l-map-mobile">
            <div className="c-map-container">
              <Map />
              {/* Map controls */}
              <MapControls className="-left">
                <LegendMobile />
              </MapControls>
            </div>
          </div>
        )}
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
  filters: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired
};

export default MapPageMobile;

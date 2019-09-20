import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { OnlyOn } from 'aqueduct-components';
import { toastr } from 'react-redux-toastr';


// components
import MapPageDesktop from './desktop';
import MapPageMobile from './mobile';


class MapPage extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const {
      mapState,
      filters,
      updateMapUrl,
    } = this.props;
    const {
      mapState: nextMapState,
      filters: nextFilters
    } = nextProps;
    const mapStateChanged = !isEqual(mapState, nextMapState);
    const filtersChanged = !isEqual(filters, nextFilters);

    if (mapStateChanged || filtersChanged) updateMapUrl();

    const showWidgetInfo = localStorage.getItem('AQ_WIDGETS_INFO_HIDE');

    if (!showWidgetInfo) {
      toastr.info('Note that widgets are not always limited to the current selection and can contain information about irrigated, rained and total agriculture as well as various indicators and timeframes.', {
        onHideComplete: () => { localStorage.setItem('AQ_WIDGETS_INFO_HIDE', true); },
        timeout: 5500
      });
    }
  }

  render() {
    return (
      <div className="-mobile-fullscreen">
        <OnlyOn device="mobile">
          <MapPageMobile {...this.props} />
        </OnlyOn>
        <OnlyOn device="desktop">
          <MapPageDesktop {...this.props} />
        </OnlyOn>
      </div>
    );
  }
}

MapPage.propTypes = {
  mapState: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateMapUrl: PropTypes.func.isRequired
};

export default MapPage;

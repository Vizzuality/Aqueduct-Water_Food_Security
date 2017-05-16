import { connect } from 'react-redux';
import ReportPage from 'components/pages/ReportPage';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { updateReportUrl } from 'actions/url';
import getActiveLayers from 'selectors/layers_active';
import getActiveWidgets from 'selectors/widgets_active';

const mapStateToProps = state => ({
  mapConfig: state.map,
  filters: state.filters,
  countries: state.countries,
  sidebar: state.sidebar,
  layersActive: getActiveLayers(state),
  widgetsActive: getActiveWidgets(state)
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateReportUrl());
  },
  updateMapUrl: () => {
    dispatch(updateReportUrl());
  },
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateReportUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);

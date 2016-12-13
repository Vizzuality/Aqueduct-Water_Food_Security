import { connect } from 'react-redux';
import MapPage from 'components/pages/MapPage';
import { setMapLocation } from 'actions/map';
import { setFilters } from 'actions/filters';
import { updateMapUrl } from 'actions/url';

const mapStateToProps = ({ map, filters, layers, countries }) => ({
  mapConfig: map,
  filters,
  layers,
  countries
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  },
  updateMapUrl: () => {
    dispatch(updateMapUrl());
  },
  setFilters: (params) => {
    dispatch(setFilters(params));
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

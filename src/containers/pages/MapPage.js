import { connect } from 'react-redux';
import MapPage from 'components/pages/MapPage';
import { setMapLocation } from 'actions/map';
import { updateMapUrl } from 'actions/url';

const mapStateToProps = ({ map }) => ({
  mapConfig: map
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  },
  updateMapUrl: () => {
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

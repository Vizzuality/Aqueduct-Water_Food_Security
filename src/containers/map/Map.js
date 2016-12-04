import { connect } from 'react-redux';
import Map from 'components/map/Map';
import { setMapLocation } from 'actions/map';
import { updateMapUrl } from 'actions/url';

const mapStateToProps = ({ map }) => ({
  mapConfig: map
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

import { connect } from 'react-redux';
import Map from 'components/map/Map';
import { setMapLocation } from 'actions/map';
import { updateUrl } from 'actions/url';

const mapStateToProps = ({ map }) => ({
  map
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

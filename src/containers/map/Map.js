import { connect } from 'react-redux';
import Map from 'components/map/Map';
import { panMaps } from 'actions/maps';

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(panMaps(params));
  }
});

export default connect(null, mapDispatchToProps)(Map);

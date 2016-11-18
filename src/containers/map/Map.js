import { connect } from 'react-redux';
import Map from 'components/map/Map';
import { panMaps } from 'actions/maps';
import { updateURL } from 'actions/links';

const mapStateToProps = ({ map }) => ({
  map
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(panMaps(params));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

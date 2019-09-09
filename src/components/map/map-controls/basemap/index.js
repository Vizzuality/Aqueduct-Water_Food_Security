import { connect } from 'react-redux';

// actions
import { setBasemap } from 'actions/map';

// components
import BasemapControl from './component';

export default connect(
  state => ({ basemap: state.map.basemap }),
  { setBasemap }
)(BasemapControl);

import { connect } from 'react-redux';

// selector
import { getWaterLayerName } from './selectors';

// component
import LegendItem from './component';

export default connect(
  state => ({ waterLayerName: getWaterLayerName(state) }),
  null
)(LegendItem);

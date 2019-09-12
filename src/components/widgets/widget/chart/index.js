import { connect } from 'react-redux';

// actions
import { toggleTooltip } from 'actions/tooltip';

// component
import WidgetChart from './component';

export default connect(
  null,
  { toggleTooltip }
)(WidgetChart);

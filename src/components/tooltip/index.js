import { connect } from 'react-redux';

// actions
import { toggleTooltip, setTooltipPosition } from 'actions/tooltip';

// component
import Tooltip from './component';

export default connect(
  state => ({ tooltip: state.tooltip }),
  {
    toggleTooltip,
    setTooltipPosition
  }
)(Tooltip);

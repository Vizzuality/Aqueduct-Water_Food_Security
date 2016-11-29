import { connect } from 'react-redux';
import Tooltip from 'components/ui/Tooltip';
import { toggleTooltip, setTooltipPosition } from 'actions/tooltip';

const mapStateToProps = ({ tooltip }) => ({
  tooltip
});

export default connect(mapStateToProps, {
  toggleTooltip,
  setTooltipPosition
})(Tooltip);

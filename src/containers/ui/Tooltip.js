import { connect } from 'react-redux';
import Tooltip from 'components/ui/Tooltip';
import { toggleTooltip, tooltipSetPosition } from 'actions/tooltip';

const mapStateToProps = ({ tooltip }) => ({
  tooltip
});

export default connect(mapStateToProps, {
  toggleTooltip,
  tooltipSetPosition
})(Tooltip);

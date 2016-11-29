import { connect } from 'react-redux';
import TooltipSample from 'components/ui/TooltipSample';
import { toggleTooltip, setTooltiplChildren, tooltipLoading } from 'actions/tooltip';

export default connect(null, {
  toggleTooltip,
  setTooltiplChildren,
  tooltipLoading
})(TooltipSample);

import { connect } from 'react-redux';
import WidgetChart from 'components/widgets/WidgetChart';
import { toggleTooltip } from 'actions/tooltip';

export default connect(null, {
  toggleTooltip
})(WidgetChart);

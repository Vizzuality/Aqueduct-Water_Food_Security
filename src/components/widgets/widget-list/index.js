import { connect } from 'react-redux';

// selectors
import getActiveWidgets from 'selectors/widgets_active';

// component
import WidgetList from './component';

export default connect(
  state => ({
    filters: state.filters,
    widgets: getActiveWidgets(state)
  }),
  null
)(WidgetList);

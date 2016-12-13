import { connect } from 'react-redux';
import WidgetList from 'components/widgets/WidgetList';
import getActiveWidgets from 'selectors/widgets_active';

const mapStateToProps = state => ({
  loading: state.datasets.loading,
  widgetsActive: getActiveWidgets(state)
});

export default connect(mapStateToProps, null)(WidgetList);

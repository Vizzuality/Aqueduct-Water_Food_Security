import { connect } from 'react-redux';
import WidgetList from 'components/widgets/WidgetList';
import { getDatasets } from 'actions/datasets';
import getActiveDatasets from 'selectors/datasets_active';

const mapStateToProps = state => ({
  datasets: state.datasets,
  datasetsActive: getActiveDatasets(state)
});

export default connect(mapStateToProps, {
  getDatasets
})(WidgetList);

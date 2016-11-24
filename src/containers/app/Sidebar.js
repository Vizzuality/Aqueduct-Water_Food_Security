import { connect } from 'react-redux';
import Sidebar from 'components/app/Sidebar';
import { getDatasets } from 'actions/datasets';
import getActiveDatasets from 'selectors/datasets_active';

const mapStateToProps = state => ({
  datasets: state.datasets,
  datasetsActive: getActiveDatasets(state)
});

export default connect(mapStateToProps, {
  getDatasets
})(Sidebar);

import { connect } from 'react-redux';
import Sidebar from 'components/app/Sidebar';
import { getDatasets } from 'actions/datasets';

const mapStateToProps = ({ widgets, datasets }) => ({
  widgets,
  datasets
});

export default connect(mapStateToProps, {
  getDatasets
})(Sidebar);

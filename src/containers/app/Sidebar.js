import { connect } from 'react-redux';
import Sidebar from 'components/app/Sidebar';
import { getWidgets } from 'actions/widgets';

const mapStateToProps = state => ({
  widgets: state.widgets
});

export default connect(mapStateToProps, {
  getWidgets
})(Sidebar);

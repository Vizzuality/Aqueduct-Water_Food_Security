import { connect } from 'react-redux';
import Sidebar from 'components/ui/Sidebar';
import { setSidebarWidth } from 'actions/sidebar';
import { toggleModal } from 'aqueduct-components';

export default connect(null, {
  setSidebarWidth,
  toggleModal
})(Sidebar);

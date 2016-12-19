import { connect } from 'react-redux';
import Sidebar from 'components/ui/Sidebar';
import { setSidebarWidth } from 'actions/sidebar';

export default connect(null, {
  setSidebarWidth
})(Sidebar);

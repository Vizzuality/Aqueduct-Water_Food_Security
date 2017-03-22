import { connect } from 'react-redux';
import { setSidebarWidth } from 'actions/sidebar';
import { Sidebar } from 'aqueduct-components';

export default connect(null, {
  setSidebarWidth
})(Sidebar);

import { connect } from 'react-redux';

// component
import { Sidebar } from 'aqueduct-components';

// actions
import { setSidebarWidth } from 'actions/sidebar';

export default connect(
  null,
  { setSidebarWidth }
)(Sidebar);

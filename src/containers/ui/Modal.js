import { connect } from 'react-redux';
import { Modal } from 'aqueduct-components';

const mapStateToProps = ({ modal }) => ({
  modal
});

export default connect(mapStateToProps, null)(Modal);

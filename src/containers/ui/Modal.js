import { connect } from 'react-redux';
import { Modal, toggleModal, setModalOptions } from 'aqueduct-components';

const mapStateToProps = ({ modal }) => ({
  modal
});

export default connect(mapStateToProps, {
  toggleModal,
  setModalOptions
})(Modal);

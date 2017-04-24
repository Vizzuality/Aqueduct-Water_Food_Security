import { connect } from 'react-redux';
import { Modal, closeModal, toggleModal, modalLoading, setModalOptions } from 'aqueduct-components';

const mapStateToProps = ({ modal }) => ({
  modal
});

export default connect(mapStateToProps, {
  closeModal,
  toggleModal,
  modalLoading,
  setModalOptions
})(Modal);

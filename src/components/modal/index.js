import { connect } from 'react-redux';
import {
  Modal,
  closeModal,
  toggleModal,
  modalLoading,
  setModalOptions
} from 'aqueduct-components';

export default connect(
  state => ({ modal: state.modal }),
  {
    closeModal,
    toggleModal,
    modalLoading,
    setModalOptions
  }
)(Modal);

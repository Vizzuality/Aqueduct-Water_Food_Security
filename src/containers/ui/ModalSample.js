import { connect } from 'react-redux';
import ModalSample from 'components/ui/ModalSample';
import { openModal, closeModal, setModalChildren, modalLoading, modalReady } from 'actions/modal';

export default connect(null, {
  openModal,
  closeModal,
  setModalChildren,
  modalLoading,
  modalReady
})(ModalSample);

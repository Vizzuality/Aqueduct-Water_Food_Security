import { connect } from 'react-redux';
import ModalSample from 'components/ui/ModalSample';
import { toggleModal, setModalChildren, modalLoading } from 'actions/modal';

export default connect(null, {
  toggleModal,
  setModalChildren,
  modalLoading
})(ModalSample);

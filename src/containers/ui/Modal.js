import { connect } from 'react-redux';
import Modal from 'components/ui/Modal';
import { toggleModal } from 'actions/modal';

const mapStateToProps = ({ modal }) => ({
  modal
});

export default connect(mapStateToProps, {
  toggleModal
})(Modal);

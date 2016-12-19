import { connect } from 'react-redux';
import Widget from 'components/widgets/Widget';
import { toggleModal } from 'actions/modal';

export default connect(null, {
  toggleModal
})(Widget);

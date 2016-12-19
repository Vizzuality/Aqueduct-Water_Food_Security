import { connect } from 'react-redux';
import Legend from 'components/legend/Legend';
import { toggleModal } from 'actions/modal';

export default connect(null, {
  toggleModal
})(Legend);

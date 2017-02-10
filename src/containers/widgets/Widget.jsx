import { connect } from 'react-redux';
import Widget from 'components/widgets/Widget';
import { toggleModal } from 'aqueduct-components';

export default connect(null, {
  toggleModal
})(Widget);

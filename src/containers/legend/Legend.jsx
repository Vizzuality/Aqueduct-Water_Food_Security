import { connect } from 'react-redux';
import Legend from 'components/legend/Legend';
import { toggleModal } from 'aqueduct-components';

export default connect(null, {
  toggleModal
})(Legend);

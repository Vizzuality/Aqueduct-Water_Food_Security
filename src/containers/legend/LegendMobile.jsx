import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';
import LegendMobile from 'components/legend/LegendMobile';

export default connect(null, {
  toggleModal
})(LegendMobile);

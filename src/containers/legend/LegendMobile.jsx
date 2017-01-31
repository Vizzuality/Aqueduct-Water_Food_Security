import { connect } from 'react-redux';
import { toggleModal } from 'actions/modal';
import LegendMobile from 'components/legend/LegendMobile';

export default connect(null, {
  toggleModal
})(LegendMobile);

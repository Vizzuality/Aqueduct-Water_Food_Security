import { connect } from 'react-redux';
import Legend from 'components/legend/Legend';
import { toggleModal } from 'aqueduct-components';

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, {
  toggleModal
})(Legend);

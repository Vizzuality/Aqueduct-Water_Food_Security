import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';

const mapStateToProps = ({ compare }) => ({
  compare
});

export default connect(mapStateToProps, null)(ComparePage);

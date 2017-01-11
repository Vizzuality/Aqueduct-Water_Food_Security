import { connect } from 'react-redux';
import ShareModal from 'components/modal/ShareModal';
import { getShareUrl } from 'actions/share';

const mapStateToProps = ({ share }) => ({
  share
});

export default connect(mapStateToProps, {
  getShareUrl
})(ShareModal);

import React from 'react';
import Clipboard from 'clipboard';

import Icon from 'components/ui/Icon';

export default class ShareModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  componentWillMount() {
    this.props.getShareUrl(location.href);
  }


  componentDidMount() {
    this.clipboard = new Clipboard(this.btn);
    this.clipboard.on('success', (e) => {
      this.setState({ copied: true });
      setTimeout(() => {
        this.setState({ copied: false });
        e.clearSelection();
      }, 2000);
    });

    this.clipboard.on('error', () => {
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
    });
  }

  // UI EVENTS
  triggerPopup(e) {
    e && e.preventDefault();
    const width = 575;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const url = e.currentTarget.href;
    const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

    window.open(url, 'Share this analysis', opts);
  }

  render() {
    const title = 'Water and Food Security Analyzer';
    const url = this.props.share.url || location.href;
    const urlEncoded = encodeURIComponent(this.props.share.url || location.href);

    let text = 'Copy';
    let classCopy = '';

    if (this.state.copied) {
      text = 'Copied';
      classCopy = '-success';
    }
    if (this.state.error) {
      text = 'Error';
      classCopy = '-error';
    }

    return (
      <div className="c-share">
        <div className="share-header">
          <h3 className="share-title">Share this page</h3>
        </div>
        <div className="share-content">
          <div className="share-button">
            <input id="url" className="share-url" value={url} readOnly onFocus={e => e.currentTarget.select()} />
            <button
              data-clipboard-target="#url"
              ref={(node) => { this.btn = node; }}
              className={`c-btn -primary ${classCopy}`}
              type="button"
            >
              {text}
            </button>
          </div>
          <div className="share-sozial">
            <a
              href={`https://twitter.com/share?url=${urlEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn -primary -with-icon -twitter -social"
              onClick={this.triggerPopup}
            >
              <Icon name="icon-twitter" />
              <span>Twitter</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&t=${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn -primary -with-icon -facebook -social"
              onClick={this.triggerPopup}
            >
              <Icon name="icon-facebook" />
              <span>Facebook</span>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${urlEncoded}&title=${title}&summary=&source=`}
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn -primary -with-icon -linkedin -social"
              onClick={this.triggerPopup}
            >
              <Icon name="icon-linkedin" />
              <span>Linkedin</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ShareModal.propTypes = {
  share: React.PropTypes.object,
  getShareUrl: React.PropTypes.func
};

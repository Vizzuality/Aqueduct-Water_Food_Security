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

  render() {
    // TODO: bitly
    const url = location.href;
    const urlEncoded = encodeURIComponent(location.href);

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
            <a href={`https://twitter.com/share?url=${urlEncoded}`} data-social="Twitter" target="_blank" rel="noopener noreferrer" className="c-btn -primary -with-icon -twitter" type="button" name="button">
              <Icon name="icon-twitter" />
              Twitter
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&t=Global Cancer Project Map`} data-social="Facebook" target="_blank" rel="noopener noreferrer" className="c-btn -primary -with-icon -facebook" type="button" name="button">
              <Icon name="icon-facebook" />
              Facebook
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${urlEncoded}&title=Global Cancer Project Map&summary=&source=`} data-social="Linkedin" target="_blank" rel="noopener noreferrer" className="c-btn -primary -with-icon -linkedin" type="button" name="button">
              <Icon name="icon-linkedin" />
              Linkedin
            </a>
          </div>
        </div>
      </div>
    );
  }
}

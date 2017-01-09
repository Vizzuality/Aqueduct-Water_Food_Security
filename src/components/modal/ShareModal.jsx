import React from 'react';
import Clipboard from 'clipboard';

export default class ShareModal extends React.Component {

  componentDidMount() {
    this.clipboard = new Clipboard(this.btn);
  }

  render() {
    const url = 'http://www.google.es';
    return (
      <div className="c-share">
        <div className="share-header">
          <h3 className="share-title">Share this page</h3>
        </div>
        <div className="share-content">
          <span id="url" className="share-url">{url}</span>
          <button data-clipboard-target="#url" ref={(node) => { this.btn = node; }} className="c-btn -primary" type="button">Copy</button>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class InfoModal extends React.Component {

  render() {
    const notAvailable = 'Not available';

    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{this.props.info.title}</span>
          </div>
        </div>
        <div className="info-description">
          <dl>
            <dt>Instructions:</dt>
            <dd>{this.props.info.instructions || notAvailable}</dd>
            <dt>Description:</dt><br />
            <dd dangerouslySetInnerHTML={{ __html: this.props.info.description || notAvailable }} />
            <dt>Citation:</dt>
            <dd>{this.props.info.citation || notAvailable}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

InfoModal.propTypes = {
  info: React.PropTypes.object
};

import React from 'react';

export default function SourceModal(props) {
  const notAvailable = 'Not available';

  return (
    <div className="c-info">
      <div className="info-header">
        <div className="info-titles">
          <span className="info-title">{props.layer.name}</span>
          <span className="info-subtitle">{props.layer.subtitle}</span>
        </div>
      </div>
      <div className="info-description">
        <dl>
          <dt>Description:</dt>
          <dd>{props.layer.metadata && props.layer.metadata.description || notAvailable}</dd>
          <dt>Language:</dt>
          <dd>{props.layer.metadata && props.layer.metadata.language || notAvailable}</dd>
          <dt>Source:</dt>
          <dd>{props.layer.metadata && props.layer.metadata.source || notAvailable}</dd>
          <dt>Citation:</dt>
          <dd>{props.layer.metadata && props.layer.metadata.citation || notAvailable}</dd>
          <dt>License:</dt>
          <dd>{props.layer.metadata && props.layer.metadata.license || notAvailable}</dd>
        </dl>
      </div>
    </div>
  );
};

SourceModal.propTypes = {
  layer: React.PropTypes.object,
};

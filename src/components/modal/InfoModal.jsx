import React from 'react';
import WidgetChart from 'components/widgets/WidgetChart';

export default function InfoModal(props) {
  const notAvailable = 'Not available';

  return (
    <div className="c-info">
      <div className="info-header">
        <div className="info-titles">
          <span className="info-title">{props.widget.name}</span>
          {props.widget.subtitle &&
            <span className="info-subtitle">{props.widget.subtitle}</span>
          }
        </div>
        {/* <button className="c-btn -primary" type="button">Download</button> */}
      </div>
      <div className="info-content">
        <div className="row expanded">
          <div className="small-12 medium-8 columns">
            <div className="info-widget">
              <WidgetChart config={props.widget.widgetConfig} filters={props.filters} />
            </div>
          </div>
          <div className="small-12 medium-4 columns">
            <div className="info-description">
              <dl>
                <dt>Description:</dt>
                <dd>{props.widget.metadata && props.widget.metadata.description || notAvailable}</dd>
                <dt>Language:</dt>
                <dd>{props.widget.metadata && props.widget.metadata.language || notAvailable}</dd>
                <dt>Source:</dt>
                <dd>{props.widget.metadata && props.widget.metadata.source || notAvailable}</dd>
                <dt>Citation:</dt>
                <dd>{props.widget.metadata && props.widget.metadata.citation || notAvailable}</dd>
                <dt>License:</dt>
                <dd>{props.widget.metadata && props.widget.metadata.license || notAvailable}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoModal.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  topics: React.PropTypes.array,
};

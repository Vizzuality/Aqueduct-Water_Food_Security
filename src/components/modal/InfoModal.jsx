import React from 'react';
import WidgetChart from 'components/widgets/WidgetChart';

export default function InfoModal(props) {
  const notAvailable = 'Not available';
  // Change [] for array map
  // <ul>
  //   <li>topic 1</li>
  //   <li>topic 2</li>
  //   <li>topic 3</li>
  // </ul>
  const topics = props.topics ? [] : null;
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
                <dd>{props.description || notAvailable}</dd>
                <dt>Data source:</dt>
                <dd>{props.dataSource || notAvailable}</dd>
                <dt>Topic:</dt>
                <dd>{topics || notAvailable}</dd>
                <dt>Area:</dt>
                <dd className={props.area ? '-highlighted' : ''}>{props.area || notAvailable}</dd>
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
  description: React.PropTypes.string,
  dataSource: React.PropTypes.string,
  area: React.PropTypes.string
};

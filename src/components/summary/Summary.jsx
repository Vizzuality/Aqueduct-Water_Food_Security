import React from 'react';

export default class SummaryCountry extends React.Component {

  constructor(props) {
    super(props);
    this.getSummaryData();
  }

  getSummaryData() {
    // TODO: make request to carto with right query
    return this.props.filters;
  }

  render() {
    return (
      <div className="c-summary">
        <span className="summary-title">Brazil summary</span>
        <dl className="summary-list">
          <dt>Production</dt>
          <dd>50k</dd>
          <dt>Food demand</dt>
          <dd>300k</dd>
          <dt>Net trade</dt>
          <dd>200k</dd>
        </dl>
      </div>
    );
  }
}

SummaryCountry.propTypes = {
  filters: React.PropTypes.object
};

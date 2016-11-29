import React from 'react';

export default class TooltipSample extends React.Component {

  constructor(props) {
    super(props);
    // Bindings
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip() {
    this.props.toggleTooltip(true, {
      children: TooltipSample,
      childrenProps: {
        name: 'PERET'
      },
      follow: true,
      position: {
        x: 300,
        y: 300
      }
    });
    this.props.tooltipLoading(true);
    setTimeout(() => {
      return this.props.tooltipLoading(false);
    }, 500);
  }

  hideTooltip() {
    this.props.toggleTooltip(false);
  }

  render() {
    return (
      <div>
        <h2>Hello, my name is {this.props.name}!</h2>
        <button type="button" onClick={this.showTooltip}>Show tooltip!</button>
        <button type="button" onClick={this.hideTooltip}>Hide tooltip!</button>
      </div>
    );
  }
}

TooltipSample.propTypes = {
  // STORE
  toggleTooltip: React.PropTypes.func,
  tooltipLoading: React.PropTypes.func,
  name: React.PropTypes.string
};

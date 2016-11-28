import React from 'react';
import Spinner from 'components/ui/Spinner';

export default class Tooltip extends React.Component {
  componentWillReceiveProps({ tooltip }) {
    const self = this;
    function onMouseMove({ clientX, clientY }) {
      self.props.tooltipSetPosition({ x: clientX, y: clientY });
      self.clientX = clientX;
      self.clientY = clientY;
    }
    if (tooltip.follow && tooltip.follow !== this.props.tooltip.follow) {
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
    }
  }
  getContent() {
    return this.props.tooltip.children ? <this.props.tooltip.children {...this.props.tooltip.childrenProps} /> : null;
  }
  getStyles() {
    const topPos = this.props.tooltip.position.y;
    const bottomPos = this.props.tooltip.position.x;
    if (this.el) {
      // TODO: modify topPos and bottomPos for recalculating toooltip position if it is out of viewport
    }
    return {
      top: `${topPos}px`,
      left: `${bottomPos}px`
    };
  }
  render() {
    return (
      <div ref={(node) => { this.el = node; }} className={`c-tooltip ${this.props.tooltip.opened ? '' : '-hidden'}`} style={this.getStyles()}>
        <span>Hello, Im a tooltip!</span>
        <div className="tooltip-content">
          {this.props.tooltip.loading ? <Spinner isLoading /> : this.getContent()}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  // STORE
  tooltip: React.PropTypes.object
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';

class Tooltip extends PureComponent {
  constructor(props) {
    super(props);

    // bindings
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { tooltip: nextTooltip } = nextProps;
    const { tooltip } = this.props;
    if (nextTooltip.follow && nextTooltip.follow !== tooltip.follow) {
      document.addEventListener('mousemove', this.onMouseMove);
    }
    const stopFollowing = nextTooltip.follow === false && nextTooltip.follow !== tooltip.follow;
    const isEmpty = !nextTooltip.opened && nextTooltip.opened !== tooltip.opened;
    if (stopFollowing || isEmpty) {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseMove({ clientX, clientY }) {
    const { setTooltipPosition } = this.props;

    setTooltipPosition({ x: clientX, y: clientY });
    this.clientX = clientX;
    this.clientY = clientY;
  }

  getContent() {
    const { tooltip } = this.props;
    return tooltip.children
      ? <tooltip.children {...tooltip.childrenProps} /> : null;
  }

  getStyles() {
    const { tooltip } = this.props;
    const topPos = tooltip.position.y;
    const bottomPos = tooltip.position.x;

    return {
      position: 'fixed',
      top: `${topPos}px`,
      left: `${bottomPos}px`,
      width: '1px',
      height: '1px',
      visibility: 'hidden'
    };
  }

  render() {
    const { tooltip } = this.props;

    return (
      <TetherComponent
        attachment="bottom center"
        targetAttachment="top center"
        constraints={[{
          to: 'window',
          pin: true
        }]}
        classes={{
          element: 'c-tooltip'
        }}
        offset="10px 0"
      >
        <div
          style={this.getStyles()}
        />
        {tooltip.opened && (
          <div ref={(node) => { this.el = node; }}>
            {this.getContent()}
          </div>
        )}
      </TetherComponent>
    );
  }
}

Tooltip.propTypes = {
  tooltip: PropTypes.object.isRequired,
  setTooltipPosition: PropTypes.func.isRequired
};

export default Tooltip;

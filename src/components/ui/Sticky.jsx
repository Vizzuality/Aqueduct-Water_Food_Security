
import React from 'react';
import _ from 'lodash';

class Sticky extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSticked: this.props.isSticked
    };
  }

  componentDidMount() {
    this._setVars();
    this._setEventListeners();
  }

  componentWillUnmount() {
    this.ScrollElem.removeEventListener('scroll', this.throttledScroll);
  }

  _setVars() {
    this.ScrollElem = this.props.ScrollElem ?
      document.querySelector(this.props.ScrollElem) : window;

    this.throttledScroll = _.throttle(() => this._onScroll(), 50);
  }

  _setEventListeners() {
    this.ScrollElem.addEventListener('scroll', this.throttledScroll);
  }

  _onScroll() {
    const currentScroll = this.ScrollElem.scrollTop;

    if (this.props.bottomLimit) {
      if (currentScroll >= this.props.topLimit && currentScroll < this.props.bottomLimit
        && this.state.isSticked === false) {
        this.setState({ isSticked: true }, () => {
          this.props.onStick && this.props.onStick(this.state.isSticked);
        });
      }

      if (currentScroll >= this.props.bottomLimit && this.state.isSticked === true) {
        this.setState({ isSticked: false }, () => {
          this.props.onStick && this.props.onStick(this.state.isSticked);
        });
      }
    } else {
      if (currentScroll >= this.props.topLimit && this.state.isSticked === false) {
        this.setState({ isSticked: true }, () => {
          this.props.onStick && this.props.onStick(this.state.isSticked);
        });
      }
      if (currentScroll < this.props.topLimit && this.state.isSticked === true) {
        this.setState({ isSticked: false }, () => {
          this.props.onStick && this.props.onStick(this.state.isSticked);
        });
      }
    }
  }

  render() {
    return (
      <div
        className={`c-sticky ${this.props.className}
          ${this.state.isSticked ? this.props.customFixedClassName : ''}`}
      >
        {this.props.children}
      </div>
    );
  }
}

Sticky.defaultProps = {
  customFixedClassName: '-sticked',
  isSticked: false
};

Sticky.propTypes = {
  bottomLimit: React.PropTypes.number,
  className: React.PropTypes.string,
  children: React.PropTypes.any,
  customFixedClassName: React.PropTypes.string,
  isSticked: React.PropTypes.bool,
  onStick: React.PropTypes.func,
  ScrollElem: React.PropTypes.string,
  topLimit: React.PropTypes.number
};

export default Sticky;

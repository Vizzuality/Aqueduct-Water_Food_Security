
import React from 'react';
import _ from 'lodash';

class Sticky extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: this.props.isFixed
    };
  }

  componentDidMount() {
    this._setVars();
    this._setEventListeners();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isFixed !== nextState.isFixed;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isFixed === true && this.props.onFixed !== undefined) {
      this.props.onFixed();
    }

    if (nextState.isFixed === false && this.props.onNoFixed !== undefined) {
      this.props.onNoFixed();
    }
  }

  componentWillUnmount() {
    this.onScrollElem.removeEventListener('scroll', this.throttledScroll);
  }

  _setVars() {
    this.onScrollElem = this.props.onScrollElem ?
      document.querySelector(this.props.onScrollElem) : window;

    this.throttledScroll = _.throttle(() => this._onScroll(), 300);
  }

  _setEventListeners() {
    this.onScrollElem.addEventListener('scroll', this.throttledScroll);
  }

  _onScroll() {
    const currentScroll = this.onScrollElem.scrollTop;


    if (this.props.bottomLimit) {
      if (currentScroll >= this.props.topLimit && currentScroll < this.props.bottomLimit
        && this.state.isFixed === false) {
        this.setState({
          isFixed: true
        });
      }

      if (currentScroll >= this.props.bottomLimit && this.state.isFixed === true) {
        this.setState({
          isFixed: false
        });
      }
    } else {
      if (currentScroll >= this.props.topLimit && this.state.isFixed === false) {
        this.setState({
          isFixed: true
        });
      }
      if (currentScroll < this.props.topLimit && this.state.isFixed === true) {
        this.setState({
          isFixed: false
        });
      }
    }
  }

  render() {
    return (
      <div
        className={`c-sticky ${this.props.className}
          ${this.state.isFixed ? this.props.customFixedClassName : ''}`}
      >
        {this.props.children}
      </div>
    );
  }
}

Sticky.defaultProps = {
  customFixedClassName: '-fixed',
  isFixed: false
};

Sticky.propTypes = {
  bottomLimit: React.PropTypes.number,
  className: React.PropTypes.string,
  children: React.PropTypes.any,
  customFixedClassName: React.PropTypes.string,
  isFixed: React.PropTypes.bool,
  onFixed: React.PropTypes.func,
  onNoFixed: React.PropTypes.func,
  onScrollElem: React.PropTypes.string,
  topLimit: React.PropTypes.number
};

export default Sticky;

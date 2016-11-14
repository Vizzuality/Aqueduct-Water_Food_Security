import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../main';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: !!props.isActive,
      className: this.props.className
    };

    // BINDINGS
    this.onClickClose = this.onClickClose.bind(this);
  }

  /**
   * LIFECYCLE
   * - Be sure that you will handle your component on an if statement
   * - componentWillMount:
   *     Render a div where we are going to add the content
   * - componentDidMount:
   *     Render the content of this view with their children
   * - componentWillUnmount
   *     Remove it from the DOM
   */

  componentWillMount() {
    const className = (this.state.className) ? this.state.className : '';

    this.tooltipTarget = document.createElement('div');
    this.tooltipTarget.id = '#tooltip';
    this.tooltipTarget.className = `c-tooltip ${className}`;
    document.body.appendChild(this.tooltipTarget);
  }

  componentDidMount() {
    this._render();

    const active = (this.state.active) ? '-active' : '';
    this.tooltipTarget.className += ` ${active}`;
    this._setPosition();
  }

  componentWillUpdate() {
    this._render();
    this._setPosition();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tooltipTarget);
    document.body.removeChild(this.tooltipTarget);
    this.tooltipTarget = null;
  }

  // UI EVENTS
  onClickClose() {
    this.setState({
      active: false,
      className: ''
    });

    // - onCloseTooltip:
    // Set this function on your Component declaration
    // if you want to handle the close in your child Component
    this.props.onCloseTooltip && this.props.onCloseTooltip();
  }

  _setPosition() {
    const width = this.tooltipTarget.clientWidth;
    const heigth = this.tooltipTarget.clientHeight;

    const x = (this.props.clientX < width/2) ? width/2 : this.props.clientX;
    const y = (this.props.clientY < heigth) ? heigth : this.props.clientY;
    this.tooltipTarget.style.top = `${y}px`;
    this.tooltipTarget.style.left = `${x}px`;
  }

  _render() {
    const loading = (this.props.isLoading) ? '-loading' : '';

    ReactDOM.render(
      <Provider store={store}>
        <div className="tooltip-container">
          {/* <button className="tooltip-close" onClick={this.onClickClose}>
            <svg className="c-icon"><use xlinkHref="#icon-cross" /></svg>
          </button> */}

          {/* <div className={`c-spinner ${loading}`}>
            <div className="spinner-box">
              <div className="icon" />
            </div>
          </div> */}

          <div className="tooltip-content">
            {this.props.children}
          </div>
        </div>
      </Provider>, this.tooltipTarget
    );
  }

  render() {
    return <noscript />;
  }
}

Tooltip.propTypes = {
  // GLOBAL
  children: React.PropTypes.element,
  className: React.PropTypes.string,

  // CUSTOM
  isActive: React.PropTypes.bool,
  clientX: React.PropTypes.number,
  clientY: React.PropTypes.number,

  // Triggers
  onCloseTooltip: React.PropTypes.func
};


export default Tooltip;

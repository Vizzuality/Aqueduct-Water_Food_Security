import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../app';

class Modal extends React.Component {
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

    this.modalTarget = document.createElement('div');
    this.modalTarget.id = '#modal';
    this.modalTarget.className = `c-modal ${className}`;
    document.body.appendChild(this.modalTarget);
  }

  componentDidMount() {
    this._render();

    // The timeout is for having an animation
    setTimeout(() => {
      const active = (this.state.active) ? '-active' : '';
      this.modalTarget.className += ` ${active}`;
    }, 50);
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
    this.modalTarget = null;
  }

  // UI EVENTS
  onClickClose() {
    this.setState({
      active: false,
      className: ''
    });

    // - onCloseModal:
    // Set this function on your Component declaration
    // if you want to handle the close in your child Component
    this.props.onCloseModal && this.props.onCloseModal();
  }

  _render() {
    const loading = (this.props.isLoading) ? '-loading' : '';

    ReactDOM.render(
      <Provider store={store}>
        <div>
          <div className="modal-container">
            <button className="modal-close" onClick={this.onClickClose}>
              <svg className="c-icon -big"><use xlinkHref="#icon-cross" /></svg>
            </button>

            <div className={`c-spinner ${loading}`}>
              <div className="spinner-box">
                <div className="icon" />
              </div>
            </div>

            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
          <area className="modal-backdrop" onClick={this.onClickClose} />
        </div>
      </Provider>, this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

Modal.propTypes = {
  // GLOBAL
  children: React.PropTypes.element,
  className: React.PropTypes.string,

  // CUSTOM
  isActive: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,

  // Triggers
  onCloseModal: React.PropTypes.func
};


export default Modal;

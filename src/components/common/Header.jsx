import React from 'react';
import { Link } from 'react-router';

// Components
import HeaderTools from './HeaderTools';
import HeaderSearch from './HeaderSearch';
import Modal from './Modal';
import LinkCustom from './LinkCustom';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: ''
    };

    // Set bindings
    this.onClickBtnAction = this.onClickBtnAction.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  /**
   * UI EVENTS
   * - onClickBtnAction
  */
  onClickBtnAction(e) {
    const current = e.currentTarget.dataset.active;

    this.setState({
      active: (current !== this.state.active) ? current : ''
    });
  }

  /**
   * CHILDREN EVENTS
   * - onCloseModal
  */
  onCloseModal() {
    this.setState({
      active: ''
    });
  }

  render() {
    return (
      <header className="c-header">
        <nav>
          {/* LEFT MENU */}
          <ul className="list">
            <li>
              <button data-active="tools" className={`c-header-button ${this.state.active === 'tools' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-grid" /></svg>
                <span>Tools</span>
              </button>
            </li>
          </ul>

          {/* LOGO */}
          <h1 className="c-header-logo">
            <Link to="/">Logo</Link>
          </h1>

          {/* RIGHT MENU */}
          <ul className="list">
            <li>
              <HeaderSearch active={this.state.active === 'search'} />
              <button data-active="search" className={`c-header-button ${this.state.active === 'search' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref={`${this.state.active === 'search' ? '#icon-cross' : '#icon-search'}`} /></svg>
              </button>
            </li>
            <li>
              <button data-active="menu" className={`c-header-button ${this.state.active === 'menu' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
              </button>
            </li>
          </ul>
        </nav>

        <HeaderTools active={this.state.active === 'tools'} />

        {(this.state.active === 'menu') ?
          <Modal
            className="-menu"
            active={this.state.active === 'menu'}
            onCloseModal={this.onCloseModal}
          >
            <div className="c-modal-menu">
              <ul>
                <li>
                  <LinkCustom to="/how-to">How to.</LinkCustom>
                </li>
                <li>
                  <LinkCustom to="/resource-library">Resource Library.</LinkCustom>
                </li>
                <li>
                  <LinkCustom to="/about">About us.</LinkCustom>
                </li>
                <li>
                  <LinkCustom to="/get-involved">Get involved.</LinkCustom>
                </li>
              </ul>
              <div className="info">
                <span>Don’t Know how to use Aqueduct tools?</span>
                <span>Check out our Video tutorials.</span>
              </div>
            </div>
          </Modal>
        : null}
      </header>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};

export default Header;

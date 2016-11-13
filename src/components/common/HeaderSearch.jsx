import React from 'react';

import { ANIMATION_TIME } from '../../constants';


class HeaderSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      q: ''
    };

    // BINDINGS
    this.onSubmitSearchForm = this.onSubmitSearchForm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => {
      // If you leave the input, be sure that you blur it
      this.props.active ? this.searchInput.focus() : this.searchInput.blur();
    }, ANIMATION_TIME);
  }

  /**
   * UI EVENTS
   * - onSubmitSearchForm
   * - onInputChange
  */

  onSubmitSearchForm(e) {
    !this.state.q && e.preventDefault();
  }

  onInputChange(e) {
    this.setState({ q: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitSearchForm} action="/search/" className={`c-header-search-form ${this.props.active && '-active'}`}>
        <input
          name="q"
          type="text"
          ref={i => this.searchInput = i}
          onChange={this.onInputChange}
          placeholder="Type search"
        />
        <button data-active="search" className="close">
          <svg className="c-icon -small"><use xlinkHref="#icon-search" /></svg>
        </button>
      </form>
    );
  }
}

HeaderSearch.propTypes = {
  // ACTIONS
  active: React.PropTypes.bool
};

export default HeaderSearch;

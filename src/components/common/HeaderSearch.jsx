import React from 'react';

import { ANIMATION_TIME } from '../../constants';


class HeaderSearch extends React.Component {

  componentDidUpdate() {
    setTimeout(() => {
      // If you leave the input, be sure that you blur it
      this.props.active ? this.searchInput.focus() : this.searchInput.blur();
    }, ANIMATION_TIME);
  }

  render() {
    return (
      <form action="/search/" className={`c-header-search-form ${this.props.active && '-active'}`}>
        <input name="q" type="text" ref={i => this.searchInput = i} placeholder="Type search" />
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

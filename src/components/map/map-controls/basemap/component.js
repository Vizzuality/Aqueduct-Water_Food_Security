import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';

// components
import { Icon, RadioGroup } from 'aqueduct-components';

// constants
import { BASEMAPS } from 'components/map/constants';

class BasemapControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this._onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-basemap-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) this.toggleDropdown(false);
  }

  onBasemapChange({ value }) {
    this.props.setBasemap(value);
  }

  toggleDropdown(to) {
    const active = (typeof to !== 'undefined' && to !== null) ? to : !this.state.active;

    this.setState({ active });

    requestAnimationFrame(() => {
      if (to) {
        window.addEventListener('click', this._onScreenClick);
      } else {
        window.removeEventListener('click', this._onScreenClick);
      }
    });
    this.setState({ active });
  }

  // RENDER
  render() {
    const { basemap } = this.props;
    const { active } = this.state;

    return (
      <TetherComponent
        attachment="top right"
        constraints={[{
          to: 'window'
        }]}
        targetOffset="8px 100%"
        classes={{
          element: 'c-basemap-tooltip -arrow-right'
        }}
      >
        {/* First child: This is what the item will be tethered to */}
        <button type="button" className="basemap-button" onClick={() => this.toggleDropdown(true)}>
          <Icon name="icon-layers" className="-small" />
        </button>

        {/* Second child: If present, this item will be tethered to the the first child */}
        {active && (
          <Fragment>
            <RadioGroup
              items={Object.keys(BASEMAPS).map((k) => {
                const bs = BASEMAPS[k];
                return {
                  label: bs.label,
                  value: bs.id
                };
              })}
              name="basemap"
              selected={basemap}
              onChange={(_basemap) => { this.onBasemapChange(_basemap); }}
              className="-secondary"
            />
            <div className="divisor" />
          </Fragment>
        )}
      </TetherComponent>
    );
  }
}

BasemapControl.propTypes = {
  basemap: PropTypes.string.isRequired,
  setBasemap: PropTypes.func.isRequired
};

export default BasemapControl;

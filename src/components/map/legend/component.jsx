import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon, OnlyOn, SourceModal } from 'aqueduct-components';

// components
import LegendItem from './legend-item';

class Legend extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { expanded: props.expanded };

    this._toggleSourceModal = this.toggleSourceModal.bind(this);
  }

  toggleExpand() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  toggleSourceModal(layer) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: SourceModal,
      childrenProps: { layer }
    });
  }

  render() {
    const {
      isModal,
      layers,
      className,
      filters
    } = this.props;
    const { expanded } = this.state;
    const componentClass = classnames('c-legend', {
      [className]: !!className,
      '-expanded': expanded
    });

    return (
      <div className={componentClass}>
        {!isModal
          && (
            <OnlyOn device="desktop">
              <div className="legend-header" onClick={() => this.toggleExpand()}>
                <span className="legend-header-title">{expanded ? 'Legend' : 'View Legend'}</span>
                <button
                  className="legend-btn"
                  type="button"
                >
                  <Icon name="icon-arrow-up-2" className="legend-open-icon" />
                  <Icon name="icon-arrow-down-2" className="legend-close-icon" />
                </button>
              </div>
            </OnlyOn>)}
        <div className="legend-content">
          <ul>
            {layers.map(layer => (
              <LegendItem
                filters={filters}
                layer={layer}
                key={layer.id}
                onToggleInfo={this._toggleSourceModal}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Legend.defaultProps = {
  layers: [],
  filters: [],
  className: '',
  expanded: false,
  isModal: false,
  onToggleInfo: null
};

Legend.propTypes = {
  layers: PropTypes.array,
  filters: PropTypes.object,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  isModal: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired
};

export default Legend;

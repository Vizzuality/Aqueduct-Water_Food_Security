import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';

class AnalyzerHeader extends PureComponent {
  render() {
    const {
      title = 'Analyze',
      actions = [],
      onToggleOpen = () => {}
    } = this.props;
    return (
      <div className="c-analyzer-header">
        <div className="actions-container">
          <div className="toggle-container">
            <button
              className="accordion-analyzer-btn"
              onClick={onToggleOpen}
            >
              <Icon
                name="icon-arrow-up-2"
                className="arrow-icon"
              />
              <span className="title">{title}</span>
            </button>
          </div>
          <BtnMenu
            className="-theme-white"
            items={actions}
          />
        </div>
      </div>
    );
  }
}

AnalyzerHeader.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      cb: PropTypes.func.isRequired,
      disabled: PropTypes.bool
    })
  ),
  onToggleOpen: PropTypes.func
};

export default AnalyzerHeader;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class AnalyzerLayout extends PureComponent {
  render() {
    const {
      children,
      hideApply = false,
      disableApply = false,
      applyLabel = 'Apply analysis',
      onApply = () => {}
    } = this.props;
    return (
      <div className="l-analyzer">
        <div className="c-analyzer">
          {children}
          {!hideApply && (
            <div className="analyzer-footer">
              <button
                type="button"
                className={classnames(
                  'c-btn -light apply-analysis-btn',
                  { '-disabled': disableApply }
                )}
                onClick={() => onApply()}
                disabled={disableApply}
              >
                {applyLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

AnalyzerLayout.propTypes = {
  hideApply: PropTypes.bool,
  disableApply: PropTypes.bool,
  applyLabel: PropTypes.node,
  onApply: PropTypes.func,
  children: PropTypes.node
};

export default AnalyzerLayout;

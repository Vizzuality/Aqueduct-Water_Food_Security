import React from 'react';
import { func, string  } from 'prop-types';
import { Icon } from 'aqueduct-components';

export default function TooltipIcon(props) {
  const {
    handleClick,
    iconName = 'question',
    tooltipText = 'Learn more'
  } = props;

  return (
    <button
      type="button"
      className="icon-container right"
      onClick={handleClick}
      data-tooltip={tooltipText}
      data-position="right"
    >
      <Icon
        name={`icon-${iconName}`}
        className="title-icon"
      />
    </button>
  );
}

TooltipIcon.propTypes = {
  handleClick: func.isRequired,
  iconName: string,
  tooltipText: string
};

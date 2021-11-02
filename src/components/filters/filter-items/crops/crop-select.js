import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import {
  Icon,
  RadioGroup,
  CustomSelect,
  IRRIGATION_OPTIONS
} from 'aqueduct-components';
import { CROP_OPTIONS } from 'constants/crops';

const CropSelect = ({
  title = 'Crops',
  hideHelpIcon = false,
  onHelpIconClick = () => {},
  cropOptions = CROP_OPTIONS,
  crop,
  onCropChange = () => {},
  irrigationOptions = IRRIGATION_OPTIONS,
  irrigation,
  onIrrigationChange = () => {},
  className = ''
}) => {
  return (
    <div className={classNames("c-filters-item", className)}>
      <div className="filter-item-header">
        <span className="title">{title}</span>
        {!hideHelpIcon && (
          <button
            type="button"
            className="icon-container"
            onClick={onHelpIconClick}
          >
            <Icon
              name="icon-question"
              className="title-icon"
            />
          </button>
        )}
      </div>

      <CustomSelect
        search
        options={cropOptions.sort((c1, c2) => c1.label > c2.label ? 1 : -1)}
        value={crop}
        onValueChange={onCropChange}
      />

      <RadioGroup
        name="irrigation"
        items={irrigationOptions}
        onChange={onIrrigationChange}
        selected={irrigation}
        className="-inline"
      />
    </div>
  )
}

CropSelect.propTypes = {
  title: propTypes.node,
  hideHelpIcon: propTypes.bool,
  onHelpIconClick: propTypes.func,
  cropOptions: propTypes.arrayOf(propTypes.shape({
    value: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
  })),
  crop: propTypes.string,
  onCropChange: propTypes.func,
  irrigationOptions: propTypes.arrayOf(propTypes.shape({
    value: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
  })),
  irrigation: propTypes.string,
  onIrrigationChange: propTypes.func,
  className: propTypes.string,
}

export default CropSelect
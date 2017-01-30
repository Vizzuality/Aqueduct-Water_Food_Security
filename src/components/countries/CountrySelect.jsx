import React from 'react';
import { SimpleSelect } from 'react-selectize';

export default function CountrySelect(props) {
  const countryList = props.countries.list.map((item) => {
    return { value: item.id, label: item.name };
  });

  let parsedProps = {
    options: countryList,
    placeholder: props.placeholder || 'Select a Country'
  };

  if (props.value && countryList.length) {
    const valueCountry = props.countries.list.find(c => c.id === props.value);
    parsedProps.value = { value: valueCountry.id, label: valueCountry.name };
  }
  if (props.defaultValue && countryList.length) {
    const defaultValueCountry = props.countries.list.find(c => c.id === props.defaultValue);
    parsedProps.defaultValue = { value: defaultValueCountry.id, label: defaultValueCountry.name };
  }

  // Include all other SimpleSelect props
  parsedProps = Object.assign({}, props, parsedProps);

  return <SimpleSelect hideResetButton {...parsedProps} />;
}

CountrySelect.propTypes = {
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  countries: React.PropTypes.object
};

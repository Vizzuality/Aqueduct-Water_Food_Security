import React from 'react';
import { SimpleSelect } from 'react-selectize';

export default function CountrySelect(props) {
  const countryList = props.countries.list.map((item) => {
    return { value: item.id, label: item.properties.name };
  });

  let parsedProps = {
    options: countryList,
    placeholder: 'Select a Country'
  };

  if (props.value) {
    const valueCountry = props.countries.list.find(c => c.id === props.value);
    parsedProps.value = { value: valueCountry.id, label: valueCountry.properties.name };
  }
  if (props.defaultValue) {
    const defaultValueCountry = props.countries.list.find(c => c.id === props.defaultValue);
    parsedProps.defaultValue = { value: defaultValueCountry.id, label: defaultValueCountry.properties.name };
  }

  // Include all other SimpleSelect props
  parsedProps = Object.assign({}, props, parsedProps);

  return <SimpleSelect hideResetButton {...parsedProps} />;
}

CountrySelect.propTypes = {
  defaultValue: React.PropTypes.string,
  value: React.PropTypes.string,
  countries: React.PropTypes.object
};

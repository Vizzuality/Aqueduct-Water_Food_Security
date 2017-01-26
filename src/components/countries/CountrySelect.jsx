import React from 'react';
import CustomSelect from 'components/ui/CustomSelect';

export default function CountrySelect(props) {
  const countryList = props.countries.list.map((item) => {
    return { value: item.id, label: item.name };
  });

  let parsedProps = {
    options: countryList,
    placeholder: 'Select a Country',
    search: true
  };

  // Include all other CustomSelect props
  parsedProps = Object.assign({}, props, parsedProps);

  return <CustomSelect hideResetButton {...parsedProps} />;
}

CountrySelect.propTypes = {
  countries: React.PropTypes.object
};

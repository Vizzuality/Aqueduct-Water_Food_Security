import React from 'react';
import { SimpleSelect } from 'react-selectize';
import countries from 'data/countries';

export default function CountriesSelect(props) {
  return <SimpleSelect options={countries} {...props} placeholder="Select a Country" />;
}

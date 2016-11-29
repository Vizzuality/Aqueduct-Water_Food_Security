import React from 'react';
import CountriesSelect from 'components/app/CountriesSelect';
import countryList from 'data/countries';

export default class CompareItem extends React.Component {
  render() {
    const countrySelected = countryList.find(x => x.value === this.props.country);
    return (
      <div className="c-compareitem">
        <section className="compareitem-filters">
          <CountriesSelect
            defaultValue={countrySelected}
            onValueChange={(selected) => {
              console.info(selected);
            }}
          />
        </section>
        <section className="compareitem-map">
          <h2>{`Map of ${this.props.country || 'nowhere'}`}</h2>
        </section>
        <section className="compareitem-widgets">
          <h2>Widgets</h2>
        </section>
      </div>
    );
  }
}

CompareItem.propTypes = {
  country: React.PropTypes.string
};

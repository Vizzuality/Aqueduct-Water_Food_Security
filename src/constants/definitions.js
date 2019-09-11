export const APP_DEFINITIONS = {
  crops: {
    title: 'Crops',
    instructions: 'Select a single crop of interest or "all crops" to view the area where the crop(s) is grown.',
    description: '<p>These crops were selected based on their importance in the global commodities market and for food security. "All crops" represent all of the crops that are included in the tool as displayed in the menu. The crop layers displayed on the map reflect where the harvested area exceeds 10 hectares per pixel in 2010, regardless of the timeframe selected.</p>',
    source: '<a href="http://mapspam.info/data/" target="_blank" rel="noopener noreferrer">MapSPAM 2010</a>'
  },
  'water-risk': {
    title: 'Water Risk',
    instructions: 'Select an indicator to learn about current and future water risks in areas where selected crops are grown.',
    description: `
      <p>The map displays the level of water risk in areas producing the selected crop(s).</p>
      <p>The table below describes each of the water risk indicators. Note that some are more relevant for irrigated agriculture,
        and some are more relevant for rainfed agriculture. Future projections are only available for water stress and seasonal variability
        and are based on business-as-usual climate change and water demand scenarios.</p>
      <div class='c-table'>
        <table class='table'>
          <tr>
            <th>Indicator</th>
            <th class='description'>Description</th>
            <th>Irrigated?</th>
            <th>Rainfed?</th>
            <th>Future Projections?</th>
          </tr>
          <tr>
            <td>Water stress</td>
            <td>Baseline water stress measures the ratio of total water
            withdrawals to available renewable surface and groundwater supplies. Water withdrawals include domestic,
            industrial, irrigation, and livestock consumptive and
            nonconsumptive uses. Available renewable water supplies include the impact of upstream consumptive water
            users and large dams on downstream water availability.
            Higher values indicate more competition among
            users. </td>
            <td class='-a-center'>✔</td>
            <td></td>
            <td class='-a-center'>✔</td>
          </tr>
          <tr>
            <td>Baseline Water Depletion</td>
            <td>Baseline water depletion measures the ratio of total water
            consumption to available renewable water supplies.
            Total water consumption includes domestic, industrial,
            irrigation, and livestock consumptive uses. Available
            renewable water supplies include the impact of upstream
            consumptive water users and large dams on downstream
            water availability. Higher values indicate larger
            impact on the local water supply and decreased
            water availability for downstream users.
            Baseline water depletion is similar to baseline water
            stress; however, instead of looking at total water withdrawal (consumptive plus nonconsumptive), baseline
            water depletion is calculated using consumptive withdrawal only. </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Inter-annual variability</td>
            <td>Interannual variability measures the average betweenyear variability of available water supply, including both
            renewable surface and groundwater supplies. Higher
            values indicate wider variations in available supply from year to year.
            </td>
            <td class='-a-center'>✔</td>
            <td class='-a-center'>✔</td>
            <td></td>
          </tr>
          <tr>
            <td>Seasonal variability</td>
            <td>Seasonal variability measures the average within-year
            variability of available water supply, including both
            renewable surface and groundwater supplies. Higher
            values indicate wider variations of available supply within a year.</td>
            <td class='-a-center'>✔</td>
            <td class='-a-center'>✔</td>
            <td class='-a-center'>✔</td>
          </tr>
          <tr>
            <td>Groundwater Table Decline</td>
            <td>Groundwater table decline measures the average decline
            of the groundwater table as the average change for the
            period of study (1990–2014). The result is expressed in
            centimeters per year (cm/yr). Higher values indicate
            higher levels of unsustainable groundwater
            withdrawals.</td>
            <td class='-a-center'>✔</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
          <td>Riverine flood risk</td>
          <td>Riverine flood risk measures the percentage of population
          expected to be affected by riverine flooding in an average
          year, accounting for existing flood-protection standards.
          Flood risk is assessed using hazard (inundation caused by
          river overflow), exposure (population in flood zone), and
          vulnerability.16 The existing level of flood protection is also
          incorporated into the risk calculation. It is important to
          note that this indicator represents flood risk not in terms
          of maximum possible impact but rather as average annual
          impact. The impacts from infrequent, extreme flood years
          are averaged with more common, less newsworthy flood
          years to produce the “expected annual affected population.” Higher values indicate that a greater proportion of the population is expected to be impacted
          by riverine floods on average.</td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td>Coastal flood risk</td>
          <td>Coastal flood risk measures the percentage of the population expected to be affected by coastal flooding in an
          average year, accounting for existing flood protection
          standards. Flood risk is assessed using hazard (inundation caused by storm surge), exposure (population in
          flood zone), and vulnerability.17 The existing level of flood
          protection is also incorporated into the risk calculation.
          It is important to note that this indicator represents flood
          risk not in terms of maximum possible impact but rather
          as average annual impact. The impacts from infrequent,
          extreme flood years are averaged with more common, less
          newsworthy flood years to produce the “expected annual
          affected population.” Higher values indicate that a
          greater proportion of the population is expected
          to be impacted by coastal floods on average.</td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
            <td>Drought risk</td>
            <td>Drought risk measures where droughts are likely to
            occur, the population and assets exposed, and the vulnerability of the population and assets to adverse effects.
            Higher values indicate higher risk of drought.</td>
            <td class='-a-center'>✔</td>
            <td class='-a-center'>✔</td>
            <td></td>
          </tr>
          <tr>
          <td>Untreated Collected Wastewater</td>
            <td>Untreated connected wastewater measures the percentage of domestic wastewater that is connected through
            a sewerage system and not treated to at least a primary
            treatment level. Wastewater discharge without adequate
            treatment could expose water bodies, the general public,
            and ecosystems to pollutants such as pathogens and
            nutrients. The indicator compounds two crucial elements
            of wastewater management: connection and treatment.
            Low connection rates reflect households’ lack of access to
            public sewerage systems; the absence of at least primary
            treatment reflects a country’s lack of capacity (infrastructure, institutional knowledge) to treat wastewater.
            Together these factors can indicate the level of a country’s
            current capacity to manage its domestic wastewater
            through two main pathways: extremely low connection
            rates (below 1 percent), and high connection rates with
            little treatment. Higher values indicate higher percentages of point source wastewater discharged
            without treatment.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Coastal Eutrophication Potential</td>
            <td>Coastal eutrophication potential (CEP) measures the
            potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms
            in coastal waters. The CEP indicator is a useful metric
            to map where anthropogenic activities produce enough
            point-source and nonpoint-source pollution to potentially
            degrade the environment. When N and P are discharged
            in excess over Si with respect to diatoms, a major type
            of algae, undesirable algal species often develop. The
            stimulation of algae leading to large blooms may in turn
            result in eutrophication and hypoxia (excessive biological
            growth and decomposition that reduces oxygen available
            to other organisms). It is therefore possible to assess the
            potential for coastal eutrophication from a river’s N, P,
            and Si loading. Higher values indicate higher levels
            of excess nutrients with respect to silica, creating more favorable conditions for harmful algal
            growth and eutrophication in coastal waters
            downstream.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Unimproved/no drinking water</td>
            <td>Unimproved/no drinking water reflects the percentage of the population collecting drinking water from an
            unprotected dug well or spring, or directly from a river,
            dam, lake, pond, stream, canal, or irrigation canal (WHO
            and UNICEF 2017). Specifically, the indicator aligns with
            the unimproved and surface water categories of the Joint
            Monitoring Programme (JMP)—the lowest tiers of drinking water services. Higher values indicate areas
            where people have less access to safe drinking
            water supplies.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Unimproved/no sanitation</td>
            <td>Unimproved/no sanitation reflects the percentage of the
            population using pit latrines without a slab or platform,
            hanging/bucket latrines, or directly disposing human
            waste in fields, forests, bushes, open bodies of water,
            beaches, other open spaces, or with solid waste (WHO
            and UNICEF 2017). Specifically, the indicator aligns with
            JMP’s unimproved and open defecation categories—
            the lowest tier of sanitation services. Higher values
            indicate areas where people have less access to
            improved sanitation services.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Peak RepRisk country ESG risk index</td>
            <td>The Peak RepRisk country ESG risk index quantifies
            business conduct risk exposure related to environmental,
            social, and governance (ESG) issues in the corresponding
            country. The index provides insights into potential financial, reputational, and compliance risks, such as human
            rights violations and environmental destruction. RepRisk
            is a leading business intelligence provider that specializes
            in ESG and business conduct risk research for companies,
            projects, sectors, countries, ESG issues, NGOs, and more,
            by leveraging artificial intelligence and human analysis
            in 20 languages. WRI has elected to include the Peak
            RepRisk country ESG risk index in Aqueduct to reflect
            the broader regulatory and reputational risks that may
            threaten water quantity, quality, and access. While the
            underlying algorithm is proprietary, we believe that our
            inclusion of the Peak RepRisk country ESG risk index,
            normally unavailable to the public, is a value-add to the
            Aqueduct community. The peak value equals the highest level of the index in a given country over the last two
            years. The higher the value, the higher the risk
            exposure.</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      <div>`,
    source: 'For seasonal variability and future projections of water stress, see <a href="https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using" target="_blank" rel="noopener noreferrer">WRI Aqueduct 2015</a>. For all other baseline water risk indicators, see <a href="https://www.wri.org/publication/aqueduct-30" target="_blank" rel="noopener noreferrer">WRI Aqueduct 2019</a>.'
  },
  'food-security': {
    title: 'Food security',
    instructions: "Select a country-level dataset to learn about the demand, production, and trade for your selected crop(s). Or, view average kilocalories per person and share of population at risk of hunger to learn more about the country's risk of food insecurity.",
    description: '<p>The following datasets are available at a country scale for baseline (2010) and future years. Future projections are not available if water risk indicators without future projections have been selected (i.e., inter-annual variability, drought severity, groundwater stress, and groundwater table declining trend).</p><ul><li>Food demand for crop represents the household food demand for the selected crop(s).</li><li>Total crop production represents crop area harvested * crop yield.</li><li>Crop net trade represents the amount traded, where positive values indicate greater exports than imports.</li><li>Kilocalories per person represents the availability of calories per person.</li><li>Share of population at risk of hunger represents the percentage of the population at risk of suffering from malnourishment.</li></ul>',
    source: '<a href="https://www.ifpri.org/program/impact-model" target="_blank" rel="noopener noreferrer">IFPRI IMPACT Model 2015</a>'
  },
  timeframe: {
    title: 'Timeframe',
    instructions: 'Select baseline or future years of 2030 or 2040 to learn about water risk over time. In future years, select "absolute value" to see the projected water risk in the selected year or "change from baseline" to see the degree to which water risk is expected to increase or decrease over time.',
    description: `
      <p>Baseline reflects different years depending on the dataset. Crop area baseline data are from 2010, food security baseline data is from 2010, and water risk baseline data is based on 1960-2014. Future projections are not available if water risk indicators without future projections have been selected (i.e., inter-annual variability, drought severity, groundwater stress, and groundwater table declining trend).</p>
      <p>In future years, select "absolute value" to see the projected water risk in the selected year or "change from baseline" to see the degree to which water risk is expected to increase or decrease over time. Future projections are based on business-as-usual climate change and water demand projections.</p>
    `,
    source: `
      For baseline water risk methodology, see <a href="https://www.wri.org/publication/aqueduct-30" target="_blank" rel="noopener noreferrer">WRI Aqueduct 2019</a>.
      For future water risk projections, see <a href="https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using" target="_blank" rel="noopener noreferrer">WRI Aqueduct 2015</a>.
      For food security data (baseline and projections), see <a href="https://www.ifpri.org/program/impact-model" target="_blank" rel="noopener noreferrer">IFPRI IMPACT Model 2015</a>.
    `
  }
};

export default { APP_DEFINITIONS };

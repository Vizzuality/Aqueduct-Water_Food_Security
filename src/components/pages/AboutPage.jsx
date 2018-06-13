import React from 'react';
import { Spinner } from 'aqueduct-components';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="l-about">
        <div className="row">
          <div className="column small-12">
            <div className="c-text">
              <div className="text-section">
                <h2>Overview</h2>
                <p>Aqueduct Food aims to help decision makers map and proactively manage water-related risks to food production. Aqueduct Food combines global data on water risks and agriculture to illustrate water-related threats to and opportunities for food security, and how these dynamics may develop over time. WRI’s Aqueduct water risk maps are cross-referenced with data from the International Food Policy Research Institute (IFPRI) showing spatially explicit global crop area along with data on food production, demand, trade, prices, and hunger for every country in the world. By providing users with a better understanding of how population growth and climate change will affect global food systems, Aqueduct Food aims to enable proactive management of water related risks to food security.</p>
              </div>

              <div className="text-section">
                <h2>Uses</h2>
                <p>Aqueduct Food was designed with a variety of potential users in mind. A few example users and uses are described below:</p>

                <ul>
                  <li>International development organizations: Development banks and international aid agencies can use Aqueduct Food to help identify or confirm high priority areas with water risks to food security to which they may consider allocating resources.</li>
                  <li>Multinational agricultural corporations: Corporations that source agricultural products can use Aqueduct Food to help inform where it may be smart to make long-term infrastructure investments, where they could consider working with producers on water-efficient crop management, or from where they might source new ingredients. The information provided by the tool can help companies make business-smart, water-smart, and socially smart procurement decisions. </li>
                  <li>Ministries of water and agriculture: Government officials within relevant ministries can use Aqueduct Food to see how changes in climate and demand for water could affect their food-producing areas. </li>
                </ul>

                <p>For instructions on how to use Aqueduct Food, see <a target="_blank" href="https://s3.amazonaws.com/aqueduct-food/Aqueduct+Food+User-s+Guide.pdf">here</a>.</p>
              </div>

              <div className="text-section">
                <div className="text-subsection">
                  <h2>Data & Methodology</h2>
                  <h3>Aqueduct water risk indicators (WRI)</h3>
                  <p>The Aqueduct water risk indicators were developed using hydrological modeling of long-term trends. A list and description of each water risk indicator can be found in the table below. The table also notes which indicators are most applicable to irrigated or rainfed agriculture, and for which indicators future projections are available.</p>
                  <div className="c-table">
                    <table className="table"><tbody><tr><th>Indicator</th><th className="description">Description</th><th>Irrigated?</th><th>Rainfed?</th><th>Future Projections?</th></tr><tr><td>Water stress</td><td>Measures the ratio of total annual water withdrawals to total available annual renewable supply, accounting for upstream consumptive use. Higher values indicate less water availability and more competition among users. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.</td><td className="-a-center">✔</td><td></td><td className="-a-center">✔</td></tr><tr><td>Seasonal variability</td><td>Measures the variation in water supply between months of the year. Areas with high seasonal variability may have extreme wet and/or dry seasons. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.</td><td className="-a-center">✔</td><td className="-a-center">✔</td><td className="-a-center">✔</td></tr><tr><td>Inter-annual variability</td><td>Measures the variability in water supply from year to year. It is an indicator of the unpredictability of supply. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.</td><td className="-a-center">✔</td><td className="-a-center">✔</td><td></td></tr><tr><td>Drought severity (soil moisture)</td><td>Estimates the average magnitude of droughts based on the severity and frequency of periods of time during which soil moisture remains low. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.</td><td className="-a-center">✔</td><td className="-a-center">✔</td><td></td></tr><tr><td>Groundwater stress</td><td>Measures the relative ratio of groundwater withdrawal to recharge rate. Values above one indicate that groundwater is being depleted faster than it is being restored. Unsustainable groundwater consumption could affect groundwater availability and groundwater-dependent ecosystems. Baseline values are generated using hydrological modeling of long-term trends from 1990 to 2014.</td><td className="-a-center">✔</td><td></td><td></td></tr><tr><td>Groundwater table declining trend</td><td>Measures trends in the decline of the groundwater table. The slope of the decline correlates to the severity of the trend. Baseline values are generated using hydrological modeling from 1990 to 2014.</td><td className="-a-center">✔</td><td></td><td></td></tr></tbody></table><div></div>
                  </div>
                  <p><i>Source: Aqueduct 2018 (forthcoming)</i></p>
                </div>

                <div className="text-subsection">
                  <h3>MapSPAM (IFPRI)</h3>
                  <p>The Spatial Production Allocation Model (MapSPAM) takes a cross-entropy approach to estimate global crop distribution at a 10x10 km resolution. MapSPAM provides Aqueduct Food’s geospatially explicit crop layers. </p>
                  <p><i>Source: <a href="http://mapspam.info/" target="_blank">http://mapspam.info/</a></i></p>
                </div>

                <div className="text-subsection">
                  <h3>IMPACT Model (IFPRI)</h3>
                  <p>The International Model for Policy Analysis of Agricultural Commodities and Trade (IMPACT) is a network of linked economic, water, and crop models. Its core is a partial equilibrium economic model which simulates agricultural markets. This economic model is linked to water and crop models to analyze changing environmental, biophysical, and socioeconomic trends. Aqueduct Food’s country-scale datasets on food production, food demand, crop net trade, share of population at risk of hunger, and kilocalories per person are provided by IMPACT.</p>
                  <p><i>Source: <a href="https://www.ifpri.org/program/impact-model" target="_blank">https://www.ifpri.org/program/impact-model</a></i></p>
                </div>
              </div>

              <div className="text-section">
                <h2>Limitations</h2>
                <p>Aqueduct Food is the first-of-its kind global water and food security analyzer. This initial, limited iteration of the tool is meant to start a conversation. Based on user feedback, we anticipate continuing to build out the tool’s datasets and functionality. The following limitations should be considered before using Aqueduct Food. </p>
                <ul>
                  <li>Isolated datasets: While we are combining Aqueduct’s water risk indicators and IFPRI’s agricultural data in the same tool, these datasets are not linked to one another. The datasets were generated using different inputs and modeling approaches and thus do not impact each other. </li>
                  <li>Aggregated datasets: One score or value is used to express water risk at a sub-catchment scale and agriculture and food security information at a national scale. In reality, there may be significant variation of risk within that region.</li>
                  <li>Limited picture of agriculture: This first version of the tool contains about 20 crops. The “all crops” menu selection is limited to these 20 crops and is not representative of all global cropland. Moreover, this version of the tool does not contain data on pasture land and livestock. </li>
                  <li>Modeling uncertainties: As with all modeling exercises, there is uncertainty in the results, especially when they involve projecting future data. For future projections, the tool displays one possible scenario and is meant to demonstrate one plausible set of changes relative to the present day. Specific values should not be used in isolation for policy decisions. </li>
                  <li>
                    Other caveats:

                    <ul>
                      <li>Some crops are more drought resistant than others</li>
                      <li>Food availability is estimated based on food demand but does not consider external factors that may hinder access to food such as price</li>
                      <li>Some populations, such as indigenous communities, participate in markets that are isolated from world food price fluctuations</li>
                    </ul>
                </li>
                </ul>
              </div>
              <div className="text-section">
                <h2>Partners</h2>
                <div className="image-section">
                  <img src="/images/partners/ifpri.png" alt="IFPRI" />
                  <img src="/images/partners/wri.jpg" alt="World resources institute" />
                </div>
              </div>

              <div className="text-section">
                <h2>Funders</h2>
                <div className="image-section">
                  <img src="/images/partners/cargill.jpg" alt="CARGILL" />
                  <img src="/images/partners/skoll.jpg" alt="Skoll global threats fund" />
                </div>
              </div>

              <div className="text-section">
                <h2>Contact</h2>
                <p>For more info <a href="mailto:aqueductfood@wri.org">aqueductfood@wri.org</a>.</p>
                <p>For media inquiries or general Aqueduct inquiries, contact <a href="mailto:leah.schleifer@wri.org">Leah Schleifer</a>.</p>
                <p>For specific data-related or usability inquiries or to provide feedback about Aqueduct Food, contact <a href="mailto:sara.walker@wri.org">Sara Walker</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


AboutPage.propTypes = {
};

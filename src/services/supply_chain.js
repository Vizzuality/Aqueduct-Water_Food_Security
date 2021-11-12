// utils
import { WRIAPI } from 'utils/axios';

/**
 * fetchs supply chain analysis based on certain params.
 *
 * @param {Object} indicator - indicator to use for the analysis. must be one of: bws, bwd, cep, udw, usa, gtd.
 * @param {Object} threshold - threshold value for the indicator.
 * @param {Object} file - supply chain file to use.
 * @returns [Object] - array with analysis results.
 */

export const fetchAnalysis = params =>
  WRIAPI.post('/aqueduct/analysis', params)
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });

export default { fetchAnalysis };

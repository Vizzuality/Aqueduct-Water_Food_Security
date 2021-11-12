import axios from 'axios';

export const ANALYSIS_API = axios.create({
  baseURL: 'http://localhost:5100/api/v1/aqueduct/analysis/food-supply-chain',
  headers: { 'Content-Type': 'application/json' }
});

export default { ANALYSIS_API };
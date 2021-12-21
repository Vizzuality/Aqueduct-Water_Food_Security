// constants
import { SET_ANALYSIS, RESET_ANALYSIS } from 'constants/analyzer';

export function setAnalysis(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ANALYSIS,
      payload,
    });
  };
}

export function resetAnalysis() {
  return (dispatch) => {
    dispatch({ type: RESET_ANALYSIS });
  };
}

export default { setAnalysis, resetAnalysis };

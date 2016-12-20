import {
  MODAL_TOGGLE,
  MODAL_SET_OPTIONS,
  MODAL_LOADING
}
from 'constants/ui';

export function closeModal() {
  return dispatch => dispatch({ type: MODAL_TOGGLE });
}

export function toggleModal(opened, opts = {}) {
  return (dispatch) => {
    if (opened && opts) {
      dispatch({ type: MODAL_SET_OPTIONS, payload: opts });
    }
    dispatch({ type: MODAL_TOGGLE, payload: opened });
  };
}

export function modalLoading(loading) {
  return dispatch => dispatch({ type: MODAL_LOADING, payload: loading });
}

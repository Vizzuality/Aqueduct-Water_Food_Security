import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_SET_CHILDREN,
  MODAL_LOADING,
  MODAL_READY,
  MODAL_SET_CHILDREN_PROPS
}
from 'constants/ui';

export function closeModal() {
  return dispatch => dispatch({ type: MODAL_CLOSE });
}

export function setModalChildren(children) {
  return dispatch => dispatch({ type: MODAL_SET_CHILDREN, payload: children });
}

export function openModal(opts = {}) {
  return (dispatch) => {
    if (opts.children) {
      dispatch({ type: MODAL_SET_CHILDREN, payload: opts.children });
    }
    if (opts.children && opts.childrenProps) {
      dispatch({ type: MODAL_SET_CHILDREN_PROPS, payload: opts.childrenProps });
    }
    dispatch({ type: MODAL_OPEN });
  };
}

export function modalLoading() {
  return dispatch => dispatch({ type: MODAL_LOADING });
}

export function modalReady() {
  return dispatch => dispatch({ type: MODAL_READY });
}

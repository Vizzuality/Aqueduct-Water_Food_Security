import {
  MODAL_TOGGLE,
  MODAL_SET_CHILDREN,
  MODAL_LOADING,
  MODAL_SET_CHILDREN_PROPS
}
from 'constants/ui';

export function closeModal() {
  return dispatch => dispatch({ type: MODAL_TOGGLE });
}

export function setModalChildren(children) {
  return dispatch => dispatch({ type: MODAL_SET_CHILDREN, payload: children });
}

export function toggleModal(opened, opts = {}) {
  return (dispatch) => {
    if (opened && opts.children) {
      dispatch({ type: MODAL_SET_CHILDREN, payload: opts.children });
      if (opts.childrenProps) {
        dispatch({ type: MODAL_SET_CHILDREN_PROPS, payload: opts.childrenProps });
      }
    }
    dispatch({ type: MODAL_TOGGLE, payload: opened });
  };
}

export function modalLoading(loading) {
  return dispatch => dispatch({ type: MODAL_LOADING, payload: loading });
}

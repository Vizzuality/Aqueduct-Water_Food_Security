import {
  TOOLTIP_TOGGLE,
  TOOLTIP_SET_CHILDREN,
  TOOLTIP_LOADING,
  TOOLTIP_SET_CHILDREN_PROPS,
  TOOLTIP_SET_POSITION,
  TOOLTIP_FOLLOW_TOGGLE
}
from 'constants/ui';

export function setTooltipChildren(children) {
  return dispatch => dispatch({ type: TOOLTIP_SET_CHILDREN, payload: children });
}

export function toggleTooltip(opened, opts = {}) {
  return (dispatch) => {
    if (opened) {
      if (opts.children) {
        dispatch({ type: TOOLTIP_SET_CHILDREN, payload: opts.children });
        if (opts.childrenProps) {
          dispatch({ type: TOOLTIP_SET_CHILDREN_PROPS, payload: opts.childrenProps });
        }
      }
      if (!opts.follow && opts.position) {
        dispatch({ type: TOOLTIP_SET_POSITION, payload: { x: opts.position.x, y: opts.position.y } });
      }
      if (opts.follow) {
        dispatch({ type: TOOLTIP_FOLLOW_TOGGLE, payload: true });
        // User has to move the mouse to receive the position
        document.addEventListener('mousemove', function onMouseMove({ clientX, clientY }) {
          dispatch({ type: TOOLTIP_SET_POSITION, payload: { x: clientX, y: clientY } });
          document.removeEventListener('mousemove', onMouseMove);
        });
      }
    }
    if (!opened) {
      dispatch({ type: TOOLTIP_FOLLOW_TOGGLE, payload: false });
    }
    dispatch({ type: TOOLTIP_TOGGLE, payload: opened });
  };
}

export function tooltipLoading(loading) {
  return dispatch => dispatch({ type: TOOLTIP_LOADING, payload: loading });
}

export function setTooltipPosition({ x, y }) {
  return dispatch => dispatch({ type: TOOLTIP_SET_POSITION, payload: { x, y } });
}

export const SET_SIDEBAR_WIDTH = 'SET_SIDEBAR_WIDTH';

export function setSidebarWidth(width) {
  return {
    type: SET_SIDEBAR_WIDTH,
    payload: width
  };
}

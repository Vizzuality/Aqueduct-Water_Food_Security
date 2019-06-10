export const getMinWidgetContentHeight = (widgetConfig = {}) => {
  const height = widgetConfig.height || 0;
  const paddingTop = (widgetConfig.padding) ? widgetConfig.padding.top : 0;
  const paddingBottom = (widgetConfig.padding) ? widgetConfig.padding.bottom : 0;

  return height + paddingTop + paddingBottom;
};

export default { getMinWidgetContentHeight };

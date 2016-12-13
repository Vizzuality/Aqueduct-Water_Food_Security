export function applyTheme(data, ...themes) {
  return Object.assign({}, data, ...themes);
}

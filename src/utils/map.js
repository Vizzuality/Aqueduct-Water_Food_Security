
export const getBounds = (country = {}) => {
  const { geometry: { coordinates } } = country;
  const bounds = L.polygon(coordinates).getBounds();
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();

  if (!coordinates) return [];

  return [southWest.lat, southWest.lng, northEast.lat, northEast.lng];
};

export default { getBounds };

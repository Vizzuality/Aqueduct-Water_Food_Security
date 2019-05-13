export const applyOpacity = (hex, opacity) => {
  // Splits in 2-length chunks the hexadecimal
  const hexArray = hex.split('#')[1].match(/.{1,2}/g);
  // Converts from hex to RGB every chunk
  const rgb = hexArray.map(h => parseInt(h, 16));

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};

export default { applyOpacity };

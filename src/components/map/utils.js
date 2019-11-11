import { WATER_INDICATORS_METADATA } from './constants';

export const parseMetadataLayer = (layer = {}) => {
  if (layer.dataset === 'f0559cb4-320c-4f69-a62f-e1595623806f') {
    const { description, sources } = WATER_INDICATORS_METADATA[layer.slug];
    return ({
      ...layer,
      metadata: {
        ...layer.metadata,
        ...description && { description },
        info: {
          ...layer.metadata.info,
          ...sources && { sources }
        }
      }
    });
  }

  console.log(layer)
  return layer;
};

export default { parseMetadataLayer };

import type { VectorSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
import { useQuery } from '@tanstack/react-query';

type SourceVectorLayer = {
  id: string;
  fields?: Record<string, string>;
  description?: string;
  minzoom?: number;
  maxzoom?: number;
  source?: string;
  source_name?: string;
};

export const useSourceLayers = (source?: VectorSourceSpecification) => {
  const { data } = useQuery<
    SourceVectorLayer[],
    Error,
    SourceVectorLayer[],
    ['sourceLayers', string | undefined]
  >({
    queryKey: ['sourceLayers', source?.url],
    queryFn: async ({ queryKey: [, url] }) => {
      if (!url) return;
      const response = await fetch(url);
      const data = await response.json();

      if (!Object.prototype.hasOwnProperty.call(data, 'vector_layers')) {
        return;
      }
      return data['vector_layers'];
    },
  });
  return data;
};

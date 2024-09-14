import type { SpriteSpecification } from '@maplibre/maplibre-gl-style-spec';
import { useQuery } from '@tanstack/react-query';

export const useSpriteIds = (sprite?: SpriteSpecification) => {
  const { data } = useQuery<string[], Error, string[], ['sprite', SpriteSpecification | undefined]>(
    {
      queryKey: ['sprite', sprite],
      queryFn: async ({ queryKey: [, url] }) => {
        if (!url) return [];
        if (typeof url === 'string') {
          const response = await fetch(url + '.json');
          const data = await response.json();

          return Object.keys(data);
        }
        if (Array.isArray(url)) {
          const ids = await Promise.all(
            url.map(async (sprite) => {
              const response = await fetch(sprite.url + '.json');
              const data = await response.json();

              return Object.keys(data).map((id) => `${sprite.id}:${id}`);
            })
          );
          return ids.flat();
        }
        return [];
      },
    }
  );
  return data;
};

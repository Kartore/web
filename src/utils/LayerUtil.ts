export const layerPrefix = (id: string) => {
  return id.replace(' ', '-').replace('_', '-').split('-')[0];
};

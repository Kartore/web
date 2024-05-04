import {
  BackgroundLayerSpecification,
  CircleLayerSpecification,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
  HeatmapLayerSpecification,
  HillshadeLayerSpecification,
  LayerSpecification,
  LineLayerSpecification,
  RasterLayerSpecification,
  SymbolLayerSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { StyleSpecification } from 'maplibre-gl';

type BackgroundExcludedLayerSpecification = Exclude<
  LayerSpecification,
  BackgroundLayerSpecification
>;

type GeneralProperties = {
  id: BackgroundExcludedLayerSpecification['id'];
  source: BackgroundExcludedLayerSpecification['source'];
  sourceLayer: BackgroundExcludedLayerSpecification['source-layer'];
  minzoom: BackgroundExcludedLayerSpecification['minzoom'];
  maxzoom: BackgroundExcludedLayerSpecification['maxzoom'];
  metadata: BackgroundExcludedLayerSpecification['metadata'];
};

export type SplitLayerProperties = {
  type: BackgroundExcludedLayerSpecification['type'];
  general: GeneralProperties;
  filter: BackgroundExcludedLayerSpecification['filter'];
  paint: BackgroundExcludedLayerSpecification['paint'];
  layout: BackgroundExcludedLayerSpecification['layout'];
  visibility: Exclude<BackgroundExcludedLayerSpecification['layout'], undefined>['visibility'];
};

export type BackgroundSplitLayerProperties = {
  type: LayerSpecification['type'];
  general: {
    id: BackgroundLayerSpecification['id'];
    metadata: BackgroundLayerSpecification['metadata'];
    minzoom: BackgroundLayerSpecification['minzoom'];
    maxzoom: BackgroundLayerSpecification['maxzoom'];
  };
  paint: BackgroundLayerSpecification['paint'];
  layout: BackgroundLayerSpecification['layout'];
  visibility: Exclude<BackgroundExcludedLayerSpecification['layout'], undefined>['visibility'];
};

export const splitLayerProperties = (layer: LayerSpecification) => {
  if (layer.type === 'background') {
    const { id, type, minzoom, maxzoom, metadata, paint, layout } = layer;
    return {
      type,
      general: { id, metadata, minzoom, maxzoom },
      paint,
      layout,
      visibility: layout ? layout.visibility : 'visible',
    } satisfies BackgroundSplitLayerProperties;
  }
  const { id, type, source, 'source-layer': sourceLayer, minzoom, maxzoom, metadata } = layer;
  return {
    type,
    general: { id, source, sourceLayer, minzoom, maxzoom, metadata },
    filter: layer.filter,
    paint: layer.paint,
    layout: layer.layout,
    visibility: layer.layout ? layer.layout.visibility : 'visible',
  } satisfies SplitLayerProperties;
};

export const isBackgroundLayer = (
  layer: LayerSpecification
): layer is BackgroundLayerSpecification => {
  return layer.type === 'background';
};

export const isFillLayer = (layer: LayerSpecification): layer is FillLayerSpecification => {
  return layer.type === 'fill';
};

export const isLineLayer = (layer: LayerSpecification): layer is LineLayerSpecification => {
  return layer.type === 'line';
};

export const isSymbolLayer = (layer: LayerSpecification): layer is SymbolLayerSpecification => {
  return layer.type === 'symbol';
};

export const isRasterLayer = (layer: LayerSpecification): layer is RasterLayerSpecification => {
  return layer.type === 'raster';
};

export const isCircleLayer = (layer: LayerSpecification): layer is CircleLayerSpecification => {
  return layer.type === 'circle';
};

export const isHeatmapLayer = (layer: LayerSpecification): layer is HeatmapLayerSpecification => {
  return layer.type === 'heatmap';
};

export const isHillshadeLayer = (
  layer: LayerSpecification
): layer is HillshadeLayerSpecification => {
  return layer.type === 'hillshade';
};

export const isFillExtrusionLayer = (
  layer: LayerSpecification
): layer is FillExtrusionLayerSpecification => {
  return layer.type === 'fill-extrusion';
};

export const replaceLayerData = (
  style: StyleSpecification,
  layer: LayerSpecification,
  group: 'paint' | 'layout' | 'metadata' | undefined,
  key:
    | keyof LayerSpecification['paint' | 'layout' | 'metadata']
    | keyof Omit<LayerSpecification, 'metadata' | 'paint' | 'layout'>,
  value:
    | LayerSpecification['paint' | 'layout' | 'metadata'][keyof LayerSpecification[
        | 'paint'
        | 'layout'
        | 'metadata']]
    | Omit<LayerSpecification, 'metadata' | 'paint' | 'layout'>[keyof Omit<
        LayerSpecification,
        'metadata' | 'paint' | 'layout'
      >]
) => {
  return {
    ...style,
    layers: style.layers.map((currentLayer) => {
      if (currentLayer.id === layer.id) {
        if (group) {
          if (currentLayer[group] != null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (currentLayer[group] as any)[key] = value;
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (currentLayer[key] as any) = value;
        }
      }
      return currentLayer;
    }),
  };
};

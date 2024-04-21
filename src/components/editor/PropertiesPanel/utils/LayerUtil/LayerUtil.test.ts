import { describe } from 'vitest';
import { expect } from '@storybook/test';
import {
  BackgroundLayerSample,
  CircleLayerSample,
  FillLayerSample,
  HeatmapLayerSample,
  LineLayerSample,
  RasterLayerSample,
  SymbolLayerSample,
  HillshadeLayerSample,
  FillExtrusionLayerSample,
} from '~/samples/LayerSample.ts';
import {
  isBackgroundLayer,
  isCircleLayer,
  isFillLayer,
  isHeatmapLayer,
  isLineLayer,
  isRasterLayer,
  isSymbolLayer,
  isFillExtrusionLayer,
  isHillshadeLayer,
} from './LayerUtil.ts';

describe('LayerUtil', () => {
  describe('isBackgroundLayer', () => {
    it('should return true if layer is a background layer', () => {
      expect(isBackgroundLayer(BackgroundLayerSample)).toBe(true);
    });
    it('should return false if layer is not a background layer', () => {
      expect(isBackgroundLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isFillLayer', () => {
    it('should return true if layer is a fill layer', () => {
      expect(isFillLayer(FillLayerSample)).toBe(true);
    });
    it('should return false if layer is not a fill layer', () => {
      expect(isFillLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isLineLayer', () => {
    it('should return true if layer is a line layer', () => {
      expect(isLineLayer(LineLayerSample)).toBe(true);
    });
    it('should return false if layer is not a line layer', () => {
      expect(isLineLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isSymbolLayer', () => {
    it('should return true if layer is a symbol layer', () => {
      expect(isSymbolLayer(SymbolLayerSample)).toBe(true);
    });
    it('should return false if layer is not a symbol layer', () => {
      expect(isSymbolLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isRasterLayer', () => {
    it('should return true if layer is a raster layer', () => {
      expect(isRasterLayer(RasterLayerSample)).toBe(true);
    });
    it('should return false if layer is not a raster layer', () => {
      expect(isRasterLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isCircleLayer', () => {
    it('should return true if layer is a circle layer', () => {
      expect(isCircleLayer(CircleLayerSample)).toBe(true);
    });
    it('should return false if layer is not a circle layer', () => {
      expect(isCircleLayer(FillLayerSample)).toBe(false);
    });
  });
  describe('isHeatmapLayer', () => {
    it('should return true if layer is a heatmap layer', () => {
      expect(isHeatmapLayer(HeatmapLayerSample)).toBe(true);
    });
    it('should return false if layer is not a heatmap layer', () => {
      expect(isHeatmapLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isHillshadeLayer', () => {
    it('should return true if layer is a hillshade layer', () => {
      expect(isHillshadeLayer(HillshadeLayerSample)).toBe(true);
    });
    it('should return false if layer is not a hillshade layer', () => {
      expect(isHillshadeLayer(CircleLayerSample)).toBe(false);
    });
  });
  describe('isFillExtrusionLayer', () => {
    it('should return true if layer is a fill extrusion layer', () => {
      expect(isFillExtrusionLayer(FillExtrusionLayerSample)).toBe(true);
    });
    it('should return false if layer is not a fill extrusion layer', () => {
      expect(isFillExtrusionLayer(CircleLayerSample)).toBe(false);
    });
  });
});

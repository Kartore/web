import { useMemo, useState } from 'react';

import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import { MapProvider } from 'react-map-gl';
import { useLocalStorage } from 'usehooks-ts';

import { LayerPanel } from '~/components/editor/LayerPanel/LayerPanel.tsx';
import { MapPanel } from '~/components/editor/MapPanel/MapPanel.tsx';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
import type { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { replaceLayerData } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { Header } from '~/components/header/Header';
import { osmLiberty } from '~/samples/osm-liberty.ts';

function App() {
  const [mapStyle, setMapStyle] = useLocalStorage<StyleSpecification>(
    'kartore:style',
    osmLiberty,
    {}
  );

  const [selectedLayerId, setSelectedLayerId] = useState<string>(mapStyle.layers[0].id);
  const selectedLayer = useMemo(() => {
    const findLayer = mapStyle.layers.find((layer) => layer.id === selectedLayerId);
    return findLayer ?? mapStyle.layers[0];
  }, [mapStyle.layers, selectedLayerId]);
  const handleChangeLayerOrder = (layer: LayerSpecification[]) => {
    setMapStyle((currentStyle) => {
      return { ...currentStyle, layers: layer };
    });
  };

  const handleChangeLayerData: onChangeType = (layer, group, key, value) => {
    setMapStyle((currentStyle) => {
      return replaceLayerData(currentStyle, layer, group, key, value);
    });
  };

  return (
    <MapProvider>
      <div className={'grid max-h-screen min-h-screen w-full grid-cols-1 grid-rows-[3rem_1fr]'}>
        <Header />
        <div className={'flex h-full flex-row overflow-hidden'}>
          <LayerPanel
            className={'w-1/5 overflow-y-auto'}
            layers={mapStyle.layers}
            onChangeLayerOrder={handleChangeLayerOrder}
            onClickLayer={(layer) => {
              setSelectedLayerId(layer.id);
            }}
          />
          <div className={'flex-1'}>
            <MapPanel mapStyle={mapStyle} />
          </div>

          <div className={'w-1/5 overflow-y-auto'}>
            <PropertiesPanel
              layer={selectedLayer}
              sources={mapStyle.sources}
              onChange={handleChangeLayerData}
            />
          </div>
        </div>
      </div>
    </MapProvider>
  );
}

export default App;

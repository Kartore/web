import { useMemo, useState } from 'react';

import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import { MapProvider } from 'react-map-gl';
import { useLocalStorage } from 'usehooks-ts';

import { MapPanel } from '~/components/editor/MapPanel/MapPanel.tsx';
import { NavigationPanel } from '~/components/editor/NavigationPanel/NavigationPanel.tsx';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { replaceLayerData } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
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
      <div className={'relative flex max-h-screen min-h-screen w-full flex-row overflow-hidden'}>
        <MapPanel mapStyle={mapStyle} />
        <NavigationPanel
          className={'absolute top-2 bottom-2 left-2 w-1/5'}
          mapStyle={mapStyle}
          onChangeLayerOrder={handleChangeLayerOrder}
          selectedLayerId={selectedLayerId}
          onClickLayer={(layer) => {
            setSelectedLayerId(layer.id);
          }}
        />

        <PropertiesPanel
          className={'absolute top-2 right-2 bottom-2 w-1/5'}
          layer={selectedLayer}
          sources={mapStyle.sources}
          onChange={handleChangeLayerData}
        />
      </div>
    </MapProvider>
  );
}

export default App;

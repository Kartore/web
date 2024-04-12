import { Header } from '~/components/header/Header';
import { LayerPanel } from '~/components/editor/LayerPanel/LayerPanel.tsx';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
import { MapPanel } from '~/components/editor/MapPanel/MapPanel.tsx';
import { MapProvider } from 'react-map-gl';
import { SplitterPanel, SplitterResizeTrigger, SplitterRoot } from '@ark-ui/react';
import { osmLiberty } from '~/samples/osm-liberty.ts';
import { useLocalStorage } from 'usehooks-ts';
import { LayerSpecification, StyleSpecification } from 'maplibre-gl';

function App() {
  const [mapStyle, setMapStyle] = useLocalStorage<StyleSpecification>(
    'kartore:style',
    osmLiberty,
    {}
  );

  const handleChangeLayerOrder = (layer: LayerSpecification[]) => {
    setMapStyle((currentStyle) => {
      return { ...currentStyle, layers: layer };
    });
  };

  return (
    <MapProvider>
      <div className={'grid max-h-screen min-h-screen w-full grid-cols-1 grid-rows-[3rem_1fr]'}>
        <Header />
        <SplitterRoot
          asChild
          defaultSize={[
            { id: 'layer', size: 15, minSize: 12 },
            { id: 'map', size: 60, minSize: 40 },
            { id: 'properties', size: 15, minSize: 12 },
          ]}
        >
          <div>
            <SplitterPanel
              id={'layer'}
              style={{
                overflowY: 'auto',
              }}
            >
              <LayerPanel layers={mapStyle.layers} onChangeLayerOrder={handleChangeLayerOrder} />
            </SplitterPanel>
            <SplitterResizeTrigger
              id={'layer:map'}
              className={
                'z-10 ml-[-0.5rem] h-full w-[0.5rem] border-r border-r-gray-300 bg-transparent dark:border-r-gray-600'
              }
            />
            <SplitterPanel id={'map'}>
              <MapPanel mapStyle={mapStyle} />
            </SplitterPanel>

            <SplitterResizeTrigger
              id={'map:properties'}
              className={
                'z-10 mr-[-0.5rem] h-full w-[0.5rem] border-l border-l-gray-300 bg-transparent dark:border-l-gray-600'
              }
            />
            <SplitterPanel id={'properties'}>
              <PropertiesPanel />
            </SplitterPanel>
          </div>
        </SplitterRoot>
      </div>
    </MapProvider>
  );
}

export default App;

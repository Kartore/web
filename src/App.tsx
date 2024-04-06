import { Header } from '~/components/header/Header';
import { LayerPanel } from '~/components/editor/LayerPanel/LayerPanel.tsx';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
import { MapPanel } from '~/components/editor/MapPanel/MapPanel.tsx';
import { MapProvider } from 'react-map-gl';
import { SplitterPanel, SplitterResizeTrigger, SplitterRoot } from '@ark-ui/react';

function App() {
  return (
    <MapProvider>
      <div className={'grid max-h-screen min-h-screen w-full grid-cols-1 grid-rows-[3rem_1fr]'}>
        <Header />
        <SplitterRoot
          asChild
          defaultSize={[
            { id: 'layer', size: 25 },
            { id: 'map', size: 50 },
            { id: 'properties', size: 25 },
          ]}
        >
          <div>
            <SplitterPanel id={'layer'}>
              <LayerPanel />
            </SplitterPanel>
            <SplitterResizeTrigger
              id={'layer:map'}
              className={'h-full w-1 bg-gray-200 dark:bg-gray-700'}
            />
            <SplitterPanel id={'map'}>
              <MapPanel />
            </SplitterPanel>

            <SplitterResizeTrigger
              id={'map:properties'}
              className={'h-full w-1 bg-gray-200 dark:bg-gray-700'}
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

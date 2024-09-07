import { Header } from '~/components/header/Header';
import { LayerPanel } from '~/components/editor/LayerPanel/LayerPanel.tsx';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
import { MapPanel } from '~/components/editor/MapPanel/MapPanel.tsx';
import { MapProvider } from 'react-map-gl';
import { osmLiberty } from '~/samples/osm-liberty.ts';
import { useLocalStorage } from 'usehooks-ts';
import { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import { useMemo, useState } from 'react';
import {
  onChangeType,
  replaceLayerData,
} from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { Box, Flex, Grid } from '@chakra-ui/react';

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
      <Grid
        maxHeight={'100vh'}
        minHeight={'100vh'}
        width={'100%'}
        templateColumns={'1fr'}
        templateRows={'3rem 1fr'}
      >
        <Header />
        <Flex height={'100%'} overflow={'hidden'}>
          <LayerPanel
            layers={mapStyle.layers}
            onChangeLayerOrder={handleChangeLayerOrder}
            onClickLayer={(layer) => {
              setSelectedLayerId(layer.id);
            }}
            overflowY={'auto'}
            width={'20%'}
          />
          <Box flex={1}>
            <MapPanel mapStyle={mapStyle} />
          </Box>

          <Box overflowY={'auto'} width={'20%'}>
            <PropertiesPanel
              layer={selectedLayer}
              sources={mapStyle.sources}
              onChange={handleChangeLayerData}
            />
          </Box>
        </Flex>
      </Grid>
    </MapProvider>
  );
}

export default App;

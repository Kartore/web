import { FC, useState } from 'react';
import { LayerSpecification } from 'maplibre-gl';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  Modifier,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableLayerTreeItem } from '~/components/editor/LayerPanel/SortableLayerTreeItem/SortableLayerTreeItem.tsx';
import { Box, BoxProps, Portal } from '@chakra-ui/react';

type LayerPanelProps = Omit<BoxProps, 'children'> & {
  layers: LayerSpecification[];
  onClickLayer: (id: LayerSpecification) => void;
  onChangeLayerOrder: (layers: LayerSpecification[]) => void;
};

export const LayerPanel: FC<LayerPanelProps> = ({
  onChangeLayerOrder,
  onClickLayer,
  layers,
  ...props
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = ({ active: { id } }: DragStartEvent) => {
    setActiveId(id);
    document.body.style.setProperty('cursor', 'grabbing');
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState();

    if (active.id === over?.id) {
      return;
    }
    if (!over) {
      return;
    }
    const clonedLayers: LayerSpecification[] = JSON.parse(JSON.stringify(layers));

    const activeIndex = clonedLayers.findIndex((layer) => layer.id === active.id);
    const overIndex = clonedLayers.findIndex((layer) => layer.id === over.id);
    const sortedLayers = arrayMove(clonedLayers, activeIndex, overIndex);
    onChangeLayerOrder(sortedLayers);
  };

  const resetState = () => {
    setActiveId(null);

    document.body.style.setProperty('cursor', '');
  };

  const adjustTranslate: Modifier = ({ transform }) => {
    return {
      ...transform,
      y: transform.y - 10,
    };
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor)
  );

  return (
    <Box height={'100%'} width={'auto'} {...props}>
      <Box borderBottom={'1px'} px={2} py={1}>
        <h2>Layers</h2>
      </Box>
      <Box px={2}>
        <DndContext
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={resetState}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={layers.map((layer) => layer.id)}
            strategy={verticalListSortingStrategy}
          >
            {layers.map((layer) => {
              return (
                <SortableLayerTreeItem
                  key={layer.id}
                  id={layer.id}
                  indicator={layer.id === activeId}
                  onClick={() => {
                    onClickLayer(layer);
                  }}
                />
              );
            })}
          </SortableContext>
          <Portal>
            <DragOverlay modifiers={[adjustTranslate]}>
              {activeId ? <SortableLayerTreeItem id={activeId} clone /> : null}
            </DragOverlay>
          </Portal>
        </DndContext>
      </Box>
    </Box>
  );
};

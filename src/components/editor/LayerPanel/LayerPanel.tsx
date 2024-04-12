import { ComponentPropsWithoutRef, FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
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
import { Portal } from '@ark-ui/react';

type LayerPanelProps = ComponentPropsWithoutRef<'div'> & {
  layers: LayerSpecification[];
  onChangeLayerOrder: (layers: LayerSpecification[]) => void;
};

export const LayerPanel: FC<LayerPanelProps> = ({
  className,
  onChangeLayerOrder,
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
    <div
      className={twMerge(
        'flex h-full w-auto flex-col bg-gray-200 text-black dark:bg-gray-700 dark:text-white',
        className
      )}
      {...props}
    >
      <div className={'border-b border-b-gray-300 px-2 py-1 dark:border-b-gray-600'}>
        <h2>Layers</h2>
      </div>
      <div className={'px-2'}>
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
      </div>
    </div>
  );
};

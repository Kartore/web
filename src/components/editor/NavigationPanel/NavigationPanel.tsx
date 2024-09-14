import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

import type { DragEndEvent, DragStartEvent, Modifier } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import { createPortal } from 'react-dom';

import { SortableLayerTreeItem } from '~/components/editor/NavigationPanel/SortableLayerTreeItem/SortableLayerTreeItem.tsx';
import { cn } from '~/utils/tailwindUtil';

type LayerPanelProps = Omit<ComponentProps<'div'>, 'children'> & {
  mapStyle: StyleSpecification;
  selectedLayerId: LayerSpecification['id'] | null;
  onClickLayer: (id: LayerSpecification) => void;
  onChangeLayerOrder: (layers: LayerSpecification[]) => void;
};

export const NavigationPanel: FC<LayerPanelProps> = ({
  onChangeLayerOrder,
  onClickLayer,
  mapStyle,
  className,
  selectedLayerId,
  ...props
}) => {
  const [activeLayer, setActiveLayer] = useState<LayerSpecification | null>(null);

  const handleDragStart = ({ active: { id } }: DragStartEvent) => {
    setActiveLayer(mapStyle.layers.find((layer) => layer.id === id) || null);

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
    const clonedLayers: LayerSpecification[] = JSON.parse(JSON.stringify(mapStyle.layers));

    const activeIndex = clonedLayers.findIndex((layer) => layer.id === active.id);
    const overIndex = clonedLayers.findIndex((layer) => layer.id === over.id);
    const sortedLayers = arrayMove(clonedLayers, activeIndex, overIndex);
    onChangeLayerOrder(sortedLayers);
  };

  const resetState = () => {
    setActiveLayer(null);

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
      {...props}
      className={cn(
        'pointer-events-auto flex h-auto w-auto flex-col rounded-lg border border-gray-300 bg-white',
        className
      )}
    >
      <div className={'flex flex-col gap-2 border-b border-b-gray-300 py-4 px-4'}>
        <h1 className={'font-[Montserrat] font-bold'}>Kartore</h1>
        <h2 className={'font-[Montserrat] font-semibold'}>{mapStyle.name}</h2>
      </div>
      <div
        className={
          'border-b border-b-gray-300 py-2 px-4 font-[Montserrat] text-sm font-medium text-gray-500'
        }
      >
        <h2>Layers</h2>
      </div>
      <div className={'flex-1 overflow-auto'}>
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
            items={mapStyle.layers.map((layer) => layer.id)}
            strategy={verticalListSortingStrategy}
          >
            {mapStyle.layers.map((layer) => {
              return (
                <SortableLayerTreeItem
                  key={layer.id}
                  isSelected={layer.id === selectedLayerId}
                  layer={layer}
                  indicator={layer.id === activeLayer?.id}
                  onClick={() => {
                    onClickLayer(layer);
                  }}
                />
              );
            })}
          </SortableContext>
          {createPortal(
            <DragOverlay modifiers={[adjustTranslate]}>
              {activeLayer ? <SortableLayerTreeItem layer={activeLayer} clone /> : null}
            </DragOverlay>,
            document.body,
            `drag-overlay-${activeLayer?.id}`
          )}
        </DndContext>
      </div>
    </div>
  );
};

NavigationPanel.displayName = 'NavigationPanel';

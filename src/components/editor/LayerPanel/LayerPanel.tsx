import type { ComponentPropsWithoutRef, FC } from 'react';
import { useState } from 'react';

import type { DragEndEvent, DragStartEvent, Modifier, UniqueIdentifier } from '@dnd-kit/core';
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
import type { LayerSpecification } from 'maplibre-gl';
import { createPortal } from 'react-dom';

import { SortableLayerTreeItem } from '~/components/editor/LayerPanel/SortableLayerTreeItem/SortableLayerTreeItem.tsx';
import { cn } from '~/utils/tailwindUtil';

type LayerPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  layers: LayerSpecification[];
  onClickLayer: (id: LayerSpecification) => void;
  onChangeLayerOrder: (layers: LayerSpecification[]) => void;
};

export const LayerPanel: FC<LayerPanelProps> = ({
  onChangeLayerOrder,
  onClickLayer,
  layers,
  className,
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
    <div {...props} className={cn('h-full w-auto', className)}>
      <div className={'border-b py-1 px-2'}>
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
                  onClick={() => {
                    onClickLayer(layer);
                  }}
                />
              );
            })}
          </SortableContext>
          {createPortal(
            <DragOverlay modifiers={[adjustTranslate]}>
              {activeId ? <SortableLayerTreeItem id={activeId} clone /> : null}
            </DragOverlay>,
            document.body,
            `drag-overlay-${activeId}`
          )}
        </DndContext>
      </div>
    </div>
  );
};

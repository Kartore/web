import { CSSProperties, FC } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  LayerTreeItem,
  LayerTreeItemProps,
} from '~/components/editor/LayerPanel/SortableLayerTreeItem/LayerTreeItem/LayerTreeItem.tsx';

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
  !(isSorting || wasDragging);

type SortableLayerTreeItemProps = LayerTreeItemProps;

export const SortableLayerTreeItem: FC<SortableLayerTreeItemProps> = ({ id, ...props }) => {
  const {
    attributes,
    isSorting,
    isDragging,
    isOver,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <LayerTreeItem
      id={id}
      ref={setNodeRef}
      style={style}
      disableInteraction={isSorting || isDragging || isOver}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};

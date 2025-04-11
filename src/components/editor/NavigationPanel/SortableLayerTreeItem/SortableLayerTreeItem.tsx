import type { CSSProperties, FC } from 'react';

import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { LayerTreeItemProps } from '~/components/editor/NavigationPanel/SortableLayerTreeItem/LayerTreeItem/LayerTreeItem.tsx';
import { LayerTreeItem } from '~/components/editor/NavigationPanel/SortableLayerTreeItem/LayerTreeItem/LayerTreeItem.tsx';

const animateLayoutChanges: AnimateLayoutChanges = ({
	isSorting,
	wasDragging,
}) => !(isSorting || wasDragging);

type SortableLayerTreeItemProps = LayerTreeItemProps;

export const SortableLayerTreeItem: FC<SortableLayerTreeItemProps> = ({
	layer,
	...props
}) => {
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
		id: layer.id,
		animateLayoutChanges,
	});
	const style: CSSProperties = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<LayerTreeItem
			ref={setNodeRef}
			style={style}
			disableInteraction={isSorting || isDragging || isOver}
			layer={layer}
			{...attributes}
			{...listeners}
			{...props}
		/>
	);
};

SortableLayerTreeItem.displayName = 'SortableLayerTreeItem';

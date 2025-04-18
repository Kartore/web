import type { ComponentProps, FC } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import { LayerIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil';

export type LayerTreeItemProps = {
	indicator?: boolean;
	clone?: boolean;
	disableInteraction?: boolean;
	layer: LayerSpecification;
	isSelected?: boolean;
} & Omit<ComponentProps<'div'>, 'id'>;

export const LayerTreeItem: FC<LayerTreeItemProps> = ({
	layer,
	indicator,
	disableInteraction,
	clone,
	className,
	isSelected,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(
				'flex w-full items-center gap-2 px-4 py-2 text-gray-800 text-sm',
				indicator && 'opacity-60',
				clone && 'inline-flex',
				disableInteraction || clone
					? 'pointer-events-none'
					: 'pointer-events-auto',
				isSelected ? 'bg-gray-200' : 'hover:bg-gray-100',
				className,
			)}
		>
			<LayerIcon type={layer.type} className={'h-3 w-3 min-w-3 cursor-grab'} />
			<p className={'flex-1 overflow-hidden text-ellipsis'}>{layer.id}</p>
		</div>
	);
};

LayerTreeItem.displayName = 'LayerTreeItem';

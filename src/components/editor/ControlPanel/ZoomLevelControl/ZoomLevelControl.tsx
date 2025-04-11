import type { ComponentProps, FC } from 'react';
import { useSyncExternalStore } from 'react';

import { useMap } from 'react-map-gl/maplibre';

import { ZoomLevelControlButton } from '~/components/editor/ControlPanel/ZoomLevelControl/ZoomLevelControlButton';
import { CompassIcon, MinusIcon, PlusIcon } from '~/components/icons';
import { useZoomLevel } from '~/hooks/useZoomLevel.ts';
import { cn } from '~/utils/tailwindUtil';

export type ZoomLevelControlProps = {} & Omit<
	ComponentProps<'div'>,
	'children'
>;

export const ZoomLevelControl: FC<ZoomLevelControlProps> = ({
	className,
	...props
}) => {
	const { backgroundMap } = useMap();
	const zoomLevel = useZoomLevel();
	const isMaxZoom = zoomLevel === backgroundMap?.getMaxZoom().toFixed(2);
	const isMinZoom = zoomLevel === backgroundMap?.getMinZoom().toFixed(2);
	const handleZoomIn = () => {
		if (isMaxZoom) return;
		backgroundMap?.zoomIn();
	};
	const handleZoomOut = () => {
		if (isMinZoom) return;
		backgroundMap?.zoomOut();
	};
	const handleResetNorthPitch = () => {
		backgroundMap?.resetNorthPitch();
	};
	const rotateCompassArrow = useSyncExternalStore(
		(callback: () => void) => {
			backgroundMap?.on('pitch', callback);
			backgroundMap?.on('rotate', callback);
			return () => {
				backgroundMap?.off('pitch', callback);
				backgroundMap?.off('rotate', callback);
			};
		},
		() => {
			if (!backgroundMap) return '';
			const pitch = backgroundMap.getPitch();
			const bearing = backgroundMap.getBearing();
			return `scale(${1 / Math.cos(pitch * (Math.PI / 180)) ** 0.5}) rotateX(${pitch}deg) rotateZ(${bearing}deg)`;
		},
	);

	return (
		<div
			{...props}
			className={cn('pointer-events-auto flex flex-col', className)}
		>
			<ZoomLevelControlButton
				className={'rounded-b-none border-b-0'}
				aria-label={'Zoom In'}
				onPress={handleZoomIn}
				isDisabled={isMaxZoom}
			>
				<PlusIcon />
			</ZoomLevelControlButton>
			<ZoomLevelControlButton
				className={'rounded-none border-b-0'}
				aria-label={'Zoom Out'}
				onPress={handleZoomOut}
				isDisabled={isMinZoom}
			>
				<MinusIcon />
			</ZoomLevelControlButton>
			<ZoomLevelControlButton
				className={'rounded-t-none'}
				aria-label={'Reset North Pitch'}
				onPress={handleResetNorthPitch}
				isDisabled={isMinZoom}
			>
				<CompassIcon
					style={{
						transform: rotateCompassArrow,
					}}
				/>
			</ZoomLevelControlButton>
		</div>
	);
};

ZoomLevelControl.displayName = 'ZoomLevelControl';

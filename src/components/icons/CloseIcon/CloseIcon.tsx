import type { HTMLAttributes } from 'react';

export type CloseIconProps = HTMLAttributes<SVGElement>;

const CloseIcon = (props: CloseIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
			<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
		</svg>
	);
};

CloseIcon.displayName = 'CloseIcon';

export { CloseIcon };

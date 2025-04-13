import type { HTMLAttributes } from 'react';

export type CompassIconProps = HTMLAttributes<SVGElement> & {
	northClassName?: string;
	southClassName?: string;
};

const CompassIcon = ({
	northClassName,
	southClassName,
	...props
}: CompassIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
			<polygon
				fill="currentColor"
				points="6,9 10,1 14,9"
				className={northClassName}
			/>
			<polygon
				fill="currentColor"
				points="6,11 10,19 14,11"
				className={southClassName}
			/>
		</svg>
	);
};

CompassIcon.displayName = 'CompassIcon';

export { CompassIcon };

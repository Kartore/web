import type { HTMLAttributes } from 'react';

export type CheckIconProps = HTMLAttributes<SVGElement>;

const CheckIcon = (props: CheckIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
			<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
		</svg>
	);
};

CheckIcon.displayName = 'CheckIcon';

export { CheckIcon };

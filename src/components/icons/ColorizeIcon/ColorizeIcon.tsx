import type { HTMLAttributes } from 'react';

export type ColorizeIconProps = HTMLAttributes<SVGElement>;

const ColorizeIcon = (props: ColorizeIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
			<path d="M120-120v-190l358-358-58-56 58-56 76 76 124-124q5-5 12.5-8t15.5-3q8 0 15 3t13 8l94 94q5 6 8 13t3 15q0 8-3 15.5t-8 12.5L705-555l76 78-57 57-56-58-358 358H120Zm80-80h78l332-334-76-76-334 332v78Zm447-410 96-96-37-37-96 96 37 37Zm0 0-37-37 37 37Z" />
		</svg>
	);
};

ColorizeIcon.displayName = 'ColorizeIcon';

export { ColorizeIcon };

import type { HTMLAttributes } from 'react';

export type ArrowDropDownIconProps = HTMLAttributes<SVGElement>;

const ArrowDropDownIcon = (props: ArrowDropDownIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
};

ArrowDropDownIcon.displayName = 'ArrowDropDownIcon';

export { ArrowDropDownIcon };

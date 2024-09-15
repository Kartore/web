import type { HTMLAttributes } from 'react';

export type PlusIconProps = HTMLAttributes<SVGElement>;

const PlusIcon = (props: PlusIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" fill={'currentColor'} />
    </svg>
  );
};

PlusIcon.displayName = 'PlusIcon';

export { PlusIcon };
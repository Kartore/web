import { forwardRef } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { FlexProps, Flex, Text } from '@chakra-ui/react';

export type LayerTreeItemProps = {
  id: UniqueIdentifier;
  indicator?: boolean;
  clone?: boolean;
  disableInteraction?: boolean;
} & Omit<FlexProps, 'id'>;

export const LayerTreeItem = forwardRef<HTMLDivElement, LayerTreeItemProps>(
  ({ id, indicator, disableInteraction, clone, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        alignItems={'center'}
        paddingX={2}
        paddingY={2}
        opacity={indicator ? '0.6' : undefined}
        display={clone ? 'inline-block' : undefined}
        pointerEvents={disableInteraction || clone ? 'none' : 'auto'}
        {...props}
      >
        <Text>{id}</Text>
      </Flex>
    );
  }
);

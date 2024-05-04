import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '~/components/common/ColorModeSwitcher';

export const Header: FC = () => {
  return (
    <Flex
      height={12}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingX={4}
      paddingY={2}
    >
      <h1>Kartore</h1>
      <ColorModeSwitcher />
    </Flex>
  );
};

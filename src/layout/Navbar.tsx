'use client';

import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { ProfileMenu } from './ProfileMenu';
import { NavNotifications } from './Notifications';
import { SidebarMenu } from './SidebarMenu';
import useGetSession from '../utils/hooks/useGetSession';
import { REALTOR_SESSION_KEY } from '../constants';

export const NAVBAR_HEIGHT = '65px';

export const Navbar = ({}) => {
  const { sessionData: realtor } = useGetSession(REALTOR_SESSION_KEY);
  console.log({ realtor });
  const disclosure = useDisclosure();

  return (
    <Box
      position={`sticky`}
      top={`0px`}
      left={`0px`}
      right={`0px`}
      transition={`.5s`}
      zIndex={`2`}
    >
      <Flex
        w={`100%`}
        justify={`space-between`}
        align={`center`}
        p={{ base: `12px 16px`, md: `12px 42px` }}
        borderBottom={`1px solid`}
        borderColor={`#E4E4E7`}
        bg={'#ffffff'}
      >
        <HStack gap={{ base: `16px`, md: `32px` }} flex="1" minW={0}>
          <SidebarMenu disclosure={disclosure} />
          <Flex align={`center`} minW={0}>
            <Text
              textTransform={`capitalize`}
              fontWeight={`500`}
              fontSize={{ base: `14px`, md: `16px` }}
              lineHeight={`100%`}
              letterSpacing={`-1.1%`}
              noOfLines={1}
            >
              {realtor?.storeName}
            </Text>
          </Flex>
        </HStack>
        <HStack gap={{ base: `8px`, md: `12px` }} flexShrink={0}>
          <NavNotifications />
          <ProfileMenu realtor={realtor} />
        </HStack>
      </Flex>
    </Box>
  );
};

'use client';

import {
  Button,
  ButtonProps,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
  useToast,
  VStack
} from '@chakra-ui/react';
import { NavMenuIcon } from '../../components/assets/navbar';
import React, { useState } from 'react';
import { NAVBAR_HEIGHT } from '../Navbar';
import { FOOTER_HEIGHT } from '../Footer';
import {
  activeLinkColors,
  getMenuFooterList,
  getMenuList,
  getSubMenuList,
  SidebarMenuInterface
} from './content';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReferralsDrawer } from '@/components/referrals/ReferralsDrawer';
import { deleteCookies } from '@/api/utils/sessionmanagers';
import { REALTOR_SESSION_KEY, TOKEN_SESSION_KEY } from '@/constants';
import Link from 'next/link';

interface MenuButtonInterface extends ButtonProps {
  data: SidebarMenuInterface;
  handleExpand?: () => void;
  linkActive?: boolean;
  hoverHighlight?: boolean;
  closeMenu?: () => void;
}

const MenuButton = ({
  data,
  linkActive,
  hoverHighlight = true,
  handleExpand,
  closeMenu,
  ...rest
}: MenuButtonInterface) => {
  const [isHovered, setIsHovered] = useState(false);
  const activeRoute = linkActive || data?.active;
  const showActiveIcon = activeRoute || (hoverHighlight && isHovered);
  const iconElement =
    data?.icon && React.isValidElement(data.icon)
      ? React.cloneElement(
          data.icon as React.ReactElement<{ color?: string }>,
          {
            color: showActiveIcon ? activeLinkColors.color : undefined
          }
        )
      : data?.icon;

  const handleClick = () => {
    handleExpand ? handleExpand() : null;
    data?.onClick ? data?.onClick() : null;
    closeMenu ? closeMenu() : null;
  };

  return (
    <Button
      as={data?.href ? Link : `button`}
      href={data?.href}
      bg={activeRoute ? activeLinkColors.bgColor : `transparent`}
      color={activeRoute ? activeLinkColors.color : '#52525B'}
      borderRadius={`full`}
      transition={`.3s`}
      p={`9px`}
      onMouseEnter={() => hoverHighlight && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={
        hoverHighlight
          ? {
              opacity: `1`,
              bg: activeLinkColors.bgColor,
              color: activeLinkColors.color
            }
          : {}
      }
      _active={{ opacity: `1` }}
      _focus={{ opacity: `1` }}
      _focusVisible={{ opacity: `1` }}
      fontWeight={`500`}
      fontSize={`15px`}
      lineHeight={`120%`}
      letterSpacing={`-1.1%`}
      onClick={handleClick}
      textAlign={`left`}
      width={`100%`}
      {...rest}
    >
      <HStack gap={`10px`} w={`100%`}>
        <Center>{iconElement}</Center>
        <Text noOfLines={1}>{data?.title}</Text>
      </HStack>
    </Button>
  );
};

export const SidebarMenu = ({
  disclosure
}: {
  disclosure?: UseDisclosureReturn;
}) => {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const innerDisclosure: UseDisclosureReturn = useDisclosure();
  const addedDisclosure: UseDisclosureReturn = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams);
  const toast = useToast();

  const handleLogout = () => {
    deleteCookies([TOKEN_SESSION_KEY, REALTOR_SESSION_KEY]);
    handleClose();
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
    router.push('/');
  };

  const clickHandler = disclosure ? disclosure : innerDisclosure;
  const handleClose = () => {
    setExpandedOption(null);
    clickHandler?.onClose();
  };

  const primaryMenu = getMenuList({
    activeMenu: expandedOption ?? ``,
    pathname
  });
  const secondaryMenu = getSubMenuList({
    activeMenu: expandedOption ?? ``,
    router,
    pathname,
    query
  });
  const footerMenu = getMenuFooterList();

  const handleExpand = (data: SidebarMenuInterface) => {
    if (data?.openNewDrawer) {
      setActiveDrawer(data?.title?.toLowerCase());
      addedDisclosure?.onOpen();
      handleClose();
      return;
    } else if (!data?.subMenu) {
      return;
    } else if (data?.title?.toLowerCase() == expandedOption) {
      setExpandedOption(null);
    } else {
      setExpandedOption(data?.title?.toLowerCase());
    }
  };

  return (
    <>
      <Center cursor={`pointer`} onClick={clickHandler?.onToggle}>
        <NavMenuIcon />
      </Center>
      <Drawer
        isOpen={clickHandler?.isOpen}
        onClose={handleClose}
        placement='left'
      >
        <DrawerOverlay
          top={NAVBAR_HEIGHT}
          bottom={`-${FOOTER_HEIGHT}`}
          bg={'rgba(0, 0, 0, 0)'}
        />
        <DrawerContent
          maxW={{ base: '100%', sm: expandedOption ? '500px' : '250px' }}
          marginTop={NAVBAR_HEIGHT}
          marginBottom={FOOTER_HEIGHT}
        >
          <DrawerBody p={`0px`}>
            <Flex gap={`0px`} h={`100%`}>
              <Stack
                w={'250px'}
                gap={`20px`}
                justify={`space-between`}
                p={`24px 18px`}
                h={`100%`}
                bg={`100%`}
              >
                <VStack align={`stretch`} gap={`9px`}>
                  {primaryMenu?.map((data: SidebarMenuInterface) => (
                    <MenuButton
                      key={data?.title}
                      data={data}
                      linkActive={
                        data?.subMenu &&
                        expandedOption == data?.title?.toLowerCase()
                      }
                      handleExpand={() => handleExpand(data)}
                    />
                  ))}
                </VStack>
                <VStack align={`stretch`} gap={`9px`}>
                  {footerMenu?.map((data: SidebarMenuInterface) => (
                    <MenuButton
                      key={data?.title}
                      data={
                        data?.title === 'Logout'
                          ? {
                              ...data,
                              onClick: handleLogout
                            }
                          : data
                      }
                      hoverHighlight={false}
                      color={data?.title == 'Logout' ? '#DC2626' : undefined}
                    />
                  ))}
                </VStack>
              </Stack>
              {expandedOption ? (
                <Stack w={'250px'} gap={`9px`} p={`24px 18px`}>
                  <Text
                    fontWeight={`500`}
                    fontSize={`15px`}
                    lineHeight={`120%`}
                    letterSpacing={`-1.1%`}
                    p={`9px`}
                    textTransform={`capitalize`}
                  >
                    {expandedOption == `more` ? `More Options` : expandedOption}
                  </Text>
                  <VStack align={`stretch`} gap={`4px`}>
                    {secondaryMenu?.map((data: SidebarMenuInterface) => (
                      <MenuButton
                        key={data?.title}
                        data={data}
                        closeMenu={handleClose}
                      />
                    ))}
                  </VStack>
                </Stack>
              ) : null}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <ReferralsDrawer disclosure={addedDisclosure} />
    </>
  );
};

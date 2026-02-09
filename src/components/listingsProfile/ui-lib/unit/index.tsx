import {
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
// import React, { ReactElement, cloneElement, isValidElement } from "react";
import ImageContainer from '../../ImageContainer';
import PropertyInfo from '../../PropertyInfo';
import LocationAndProfile from '../../LocationAndProfile';
import { UnitInfo } from './unitInfo';
import FinanceAndFees from './financeAndFees';
import { ReactElement, cloneElement, isValidElement } from 'react';
import { UnitPageComponent } from './UnitPageComponent';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export const UnitModal = ({
  children,
  unitId
}: {
  children: React.ReactNode;
  unitId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const params = useParams();
  const id = (unitId ?? '') || ((params.id as string) ?? '');
  const router = useRouter();

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const childElement = children as ReactElement<any>;
  const CloneChild = cloneElement(childElement, {
    cursor: 'pointer',
    onClick: () => {
      if (isMobile) {
        router.push(`/unit/${id}`);
      } else {
        onOpen();
      }
    },
    role: 'button'
  });
  // console.log({ childElement, CloneChild, children });
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    onClose();
    e.stopPropagation();
  };
  return (
    <>
      {CloneChild}
      {isOpen ? (
        <Box
          top={0}
          left={0}
          w='100vw'
          h='100vh'
          bg='blackAlpha.400'
          onClick={handleClose}
          position='fixed'
          zIndex={999}
          display='grid'
          placeContent='center'
        >
          <Stack
            w='90.1vw'
            overflow='auto'
            bg='white'
            h='96.89vh'
            onClick={(e: any) => e.stopPropagation()}
            maxH='872px'
            maxW='1298px'
            mx='auto'
          >
            <UnitPageComponent closeModal={handleClose} unit_id={id} />
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

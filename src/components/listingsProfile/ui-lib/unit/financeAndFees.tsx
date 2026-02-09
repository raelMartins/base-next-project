import {
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { ClosingCost } from './closingCost';
import { UnitPriceHeader } from '../priceHeader';

const FinanceAndFees = ({ unitInfo }: any) => {
  return (
    <Stack
      p='24px'
      spacing='24px'
      // minH="450px"
      flex='1.5'
      //   bg="pink"
      borderLeft='0.5px solid #D4D4D8'
      maxW='521px'
      minW='500px'
      display={{ base: 'none', xl: 'flex' }}
      divider={<StackDivider borderBottom='0.5px solid #D4D4D8 !important' />}
    >
      {/* <Stack spacing="8px">
        <Stack spacing="3px">
          <Text
            fontSize="14px"
            fontWeight="400"
            lineHeight="100%"
            letterSpacing="0%"
            color="#606060"
          >
            Starting Price
          </Text>
          <Text
            fontSize="36px"
            fontWeight="600"
            lineHeight="100%"
            letterSpacing="-2%"
            color="#116932"
          >
            15000000
          </Text>
        </Stack>

        <HStack spacing="10px">
          <HStack spacing="6px">
            <Box boxSize="10px" bg="#16A34A" rounded="full" minW="10px" />

            <Text
              fontWeight=" 500"
              fontSize=" 14px"
              lineHeight=" 100%"
              letterSpacing=" -1%"
            >
              Payment Plan Available
            </Text>
          </HStack>
          <Box boxSize="4px" bg="#3F3F46" rounded="full" minW="4px" />
          <Text
            fontWeight=" 500"
            fontSize=" 14px"
            lineHeight=" 100%"
            letterSpacing=" -1%"
          >
            Commission
          </Text>
        </HStack>
      </Stack> */}
      <UnitPriceHeader details={unitInfo} />

      <ClosingCost
        fees={unitInfo?.fees ?? []}
        display={{ base: 'none', xl: 'flex' }}
      />
    </Stack>
  );
};

export default FinanceAndFees;

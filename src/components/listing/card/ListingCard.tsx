import {
  Box,
  Center,
  Grid,
  HStack,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';
import ListingCardImages from './Images';
import { ListingType } from '@/components/pages/Listings/dummy_data';
import { Amenities } from '../Amenities';
import { PiCardholder, PiMapPin } from 'react-icons/pi';
import { FaCircle } from 'react-icons/fa';
import { formatToCurrency } from '@veerge/utils';

import { fixIcon } from '../../../utils/helpers/fix-icon';

const CardholderIcon = fixIcon(PiCardholder);
const MapPinIcon = fixIcon(PiMapPin);
const FaCircleIcon = fixIcon(FaCircle);

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop';

export const ListingCard = (props: ListingType) => {
  const images =
    props.photo_urls?.length
      ? props.photo_urls
      : props.photos?.map((p) => p.photo).filter(Boolean);
  const imageList = images?.length ? images : [FALLBACK_IMAGE];

  return (
    <Box
      width='100%'
      bg='white'
      border='1px solid'
      borderColor='#E4E4E7'
      rounded='12px'
      overflow='hidden'
    >
      <HStack
        width='100%'
        gap='0'
        flexDirection={{ xl: 'row', base: 'column' }}
      >
        <ListingCardImages images={imageList} />
        <ListingCardDetails {...props} />
      </HStack>
    </Box>
  );
};

const ListingCardDetails = (props: ListingType) => {
  const commissionStr =
    props.external_commission_rate ?? props.internal_commission_rate;
  const commission =
    commissionStr != null && Number.isFinite(parseFloat(commissionStr))
      ? parseFloat(commissionStr)
      : undefined;
  const isSoldOut =
    typeof props.units_available === 'number' && props.units_available === 0;

  return (
    <VStack
      align='flex-start'
      justify='space-between'
      flexDirection={{ md: 'column', base: 'column-reverse' }}
      width='100%'
      gap={{ md: '20px', base: '0' }}
      flex='1'
      p={{ xl: '18px 16px 18px 24px', md: '16px 16px 24px', base: '0' }}
    >
      <VStack
        width='100%'
        align='flex-start'
        gap='24px'
        p={{ md: '0', base: '16px 16px 24px' }}
      >
        <ListingNameLocationAndPrice
          name={props.name}
          address={props.address}
          price={props.starting_from ?? 0}
          commission={isSoldOut ? undefined : commission}
          isSoldOut={isSoldOut}
        />
        <Box width='100%' display={{ md: 'block', base: 'none' }}>
          <Amenities />
        </Box>
      </VStack>
      <PaymentPlanAvailabilityAndUnits
        isPaymentPlanAvailable={props.payment_plan_is_available}
        availableUnits={props.units_available}
      />
    </VStack>
  );
};

const ListingNameLocationAndPrice = ({
  name,
  address,
  price,
  commission,
  isSoldOut
}: {
  name?: string;
  address?: string;
  price: number;
  commission?: number;
  isSoldOut?: boolean;
}) => {
  const formattedPrice = formatToCurrency({ amount: price });

  return (
    <Grid
      width='100%'
      gridTemplateColumns='1fr auto'
      columnGap={{ md: '32px', base: '16px' }}
      rowGap={{ md: '8px', base: '4px' }}
    >
      <Center justifyContent='flex-start'>
        <Text
          fontSize={{ xl: '28px', md: '20px', base: '16px' }}
          noOfLines={1}
          fontWeight='500'
          lineHeight='100%'
          letterSpacing='-1.1%'
          color='#27272A'
        >
          {name || 'Listing'}
        </Text>
      </Center>
      <Center justifyContent='flex-end' textAlign='right'>
        <Text
          fontSize={{ xl: '28px', md: '20px', base: '16px' }}
          noOfLines={1}
          fontWeight='600'
          lineHeight='100%'
          letterSpacing='-1.1%'
          color='#27272A'
        >
          {isSoldOut ? 'Sold Out' : formattedPrice}
        </Text>
      </Center>
      <Center justifyContent='flex-start' gap='4px' color='#52525B'>
        <Center boxSize='20px' minWidth='20px' fontSize='20px'>
          <MapPinIcon />
        </Center>
        <Text
          fontSize={{ md: '14px', base: '13px' }}
          fontWeight='400'
          lineHeight='100%'
          letterSpacing='-1.1%'
          noOfLines={1}
        >
          {address}
        </Text>
      </Center>
      <Center justifyContent='flex-end' textAlign='right'>
        {typeof commission === 'number' ? (
          <Text
            fontSize={{ md: '13px', base: '13px' }}
            fontWeight='500'
            lineHeight='100%'
            letterSpacing='-1.1%'
            color='#124A28'
            noOfLines={1}
          >
            {commission.toPrecision(2)}% Commission
          </Text>
        ) : null}
      </Center>
    </Grid>
  );
};

const PaymentPlanAvailabilityAndUnits = ({
  isPaymentPlanAvailable,
  availableUnits
}: {
  isPaymentPlanAvailable?: boolean;
  availableUnits?: number;
}) => {
  const showUnits =
    typeof availableUnits === 'number' && availableUnits <= 2;
  const hasAnyContent = isPaymentPlanAvailable || showUnits;
  if (!hasAnyContent) return null;

  return (
    <HStack
      position='relative'
      width='100%'
      align={{ md: 'center', base: 'flex-end' }}
      justify='flex-start'
      flexDirection={{ md: 'row', base: 'row-reverse' }}
      gap={{ md: '6px', base: '4px' }}
      height={{ md: 'none', base: '8px' }}
      maxHeight={{ md: 'none', base: '8px' }}
      style={
        {
          '--payment-availability-color': isPaymentPlanAvailable
            ? '#116932'
            : '#A5A5A5',
          '--available-units-color': '#DC2626'
        } as React.CSSProperties
      }
    >
      {isPaymentPlanAvailable ? (
        <Center
          gap='4px'
          height={{ md: 'auto', base: '28px' }}
          roundedLeft={{ md: 'none', base: '4px' }}
          bg={{ md: 'transparent', base: '#16A34A' }}
          color={{ md: 'var(--payment-availability-color)', base: 'white' }}
          px={{ md: '0', base: '12px' }}
        >
          <Center
            boxSize='28px'
            minWidth='28px'
            rounded='full'
            bg='var(--payment-availability-color)'
            color='white'
            fontSize='16px'
            display={{ md: 'flex', base: 'none' }}
          >
            <CardholderIcon />
          </Center>
          <Text
            fontSize='13px'
            fontWeight='600'
            lineHeight='20px'
            letterSpacing='-1.1%'
            color='inherit'
            textDecoration={{ md: 'underline', base: 'none' }}
          >
            Payment Plan Available
          </Text>
        </Center>
      ) : null}
      {showUnits ? (
        <HStack
          align='center'
          ml='4px'
          gap='8px'
          color={{ md: 'var(--available-units-color)', base: 'white' }}
          height={{ md: 'auto', base: '28px' }}
          rounded={{ md: 'none', base: '4px' }}
          bg={{ md: 'transparent', base: 'var(--available-units-color)' }}
          px={{ md: '0', base: '12px' }}
        >
          <Icon
            as={FaCircleIcon}
            display={{ md: 'block', base: 'none' }}
            fontSize='10px'
            color='inherit'
          />
          <Text
            fontSize='13px'
            fontWeight='500'
            lineHeight='20px'
            letterSpacing='-1.1%'
            color='inherit'
          >
            {`${Math.max(0, availableUnits)} ${availableUnits === 1 ? 'unit' : 'units'} left`}
          </Text>
        </HStack>
      ) : null}
    </HStack>
  );
};

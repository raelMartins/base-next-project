import {
  Grid,
  GridItem,
  HStack,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { NextOfKinIcon } from '../assets/referrals';
import moment from 'moment';
import { EmptyState } from '@/layout/states/EmptyState';

export const ReferralNextOfKin = ({
  nextOfKinList
}: {
  nextOfKinList: any;
}) => {
  const nextOfKin: any = nextOfKinList?.[0];
  const grid_data = [
    {
      label: `Legal First Name`,
      value: nextOfKin?.first_name,
      colSpan: 2
    },
    {
      label: `Legal Last Name`,
      value: nextOfKin?.last_name,
      colSpan: 2
    },
    {
      label: `Relationship`,
      value: nextOfKin?.relationship,
      colSpan: 2
    },
    {
      label: `Email Address`,
      value: nextOfKin?.email,
      colSpan: 3
    },
    {
      label: `Date of Birth`,
      value: nextOfKin?.date_of_birth
        ? moment(nextOfKin?.date_of_birth).format('MM Do YYYY')
        : 'N/A',
      colSpan: 3
    },

    {
      label: `Residential Address`,
      value: nextOfKin?.residential_address,
      colSpan: 6
    }
  ];

  return (
    <Stack
      gap={`0px`}
      width={`100%`}
      border={'1px solid'}
      borderColor={'#E4E4E7'}
      borderRadius={`12px`}
      divider={
        <StackDivider margin={`0px !important`} borderColor={'#e4e4e7'} />
      }
    >
      <HStack padding={`16px 24px`} gap={`8px`}>
        <NextOfKinIcon />
        <Text>Next of Kin</Text>
      </HStack>
      {!nextOfKinList?.length ? (
        <EmptyState />
      ) : (
        <Grid
          templateColumns={`repeat(6, 1fr)`}
          padding={`32px 24px`}
          gap={`40px 16px`}
        >
          {grid_data?.map((el) => (
            <GridItem key={el?.label} colSpan={el?.colSpan}>
              <Stack
                gap={`6px`}
                borderRight={`1px solid`}
                borderColor={'#E4E4E7'}
              >
                <Text
                  fontWeight={`500`}
                  fontSize={`14px`}
                  lineHeight={`150%`}
                  letterSpacing={`2%`}
                  color={'#52525B'}
                >
                  {el.label}
                </Text>
                <Text>{el.value ?? 'N/A'}</Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

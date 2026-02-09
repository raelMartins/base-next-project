import {
  Grid,
  GridItem,
  HStack,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { AdditionalnfoIcon } from '../assets/referrals';
import moment from 'moment';

export const ReferralAdditionalInfo = ({ userInfo }: { userInfo: any }) => {
  const grid_data = [
    {
      label: `Occupation`,
      value: userInfo?.occupation,
      colSpan: 3
    },
    {
      label: `Marital Status`,
      value: userInfo?.marital_status,
      colSpan: 3
    },
    {
      label: `Company Name`,
      value: userInfo?.company_name,
      colSpan: 2
    },
    {
      label: `Education`,
      value: userInfo?.highest_education,
      colSpan: 2
    },
    {
      label: `Date of Birth`,
      value: moment(userInfo?.date_of_birth).format('MM Do YYYY'),
      colSpan: 2
    },
    {
      label: `Nationality`,
      value: userInfo?.nationality,
      colSpan: 2
    },
    {
      label: `Country of Residence`,
      value: userInfo?.marital_status,
      colSpan: 2
    },
    {
      label: `Source of Funds`,
      value: userInfo?.source_of_funds,
      colSpan: 2
    },
    {
      label: `Residential Address`,
      value: userInfo?.address,
      colSpan: 6
    },
    {
      label: `Company’s Address`,
      value: userInfo?.company_address,
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
        <AdditionalnfoIcon />
        <Text>Additional Information</Text>
      </HStack>
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
    </Stack>
  );
};

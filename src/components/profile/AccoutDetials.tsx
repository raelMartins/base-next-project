import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import { ProfileDetailLayout } from './ProfileDetailsLayout';
import { PiBankFill } from 'react-icons/pi';
import { FaAngleRight } from 'react-icons/fa';
import { formatDate } from '@/utils/helpers/datetime';

import { fixIcon } from '../../utils/helpers/fix-icon';
import { useProfileSettings } from '@/utils/hooks/useProfileSettings';
import { ProfileBank } from '@/api/profile.types';

const BankFillIcon = fixIcon(PiBankFill);
const AngleRightIcon = fixIcon(FaAngleRight);

function toAccountEntry(bank: ProfileBank): {
  accountNumber: string;
  bank: string;
  dateAdded: string;
} {
  const accountNumber =
    bank.account_number ?? (bank as Record<string, unknown>).account_number ?? '';
  const bankName =
    bank.bank_name ??
    bank.bank ??
    (bank as Record<string, unknown>).bank_name ??
    (bank as Record<string, unknown>).bank ??
    '';
  const dateAdded =
    bank.created_at ??
    bank.date_added ??
    (bank as Record<string, unknown>).created_at ??
    (bank as Record<string, unknown>).date_added ??
    new Date().toISOString();
  return { accountNumber: accountNumber.toString(), bank: bankName.toString(), dateAdded: dateAdded.toString() };
}

export const AccountDetails = () => {
  const { banks } = useProfileSettings();
  const accounts = banks.map(toAccountEntry).filter((a) => a.accountNumber || a.bank);
  return (
    <ProfileDetailLayout
      heading='Settlement Account'
      buttonText='Manage Bank Account'
    >
      <VStack width='100%' gap='8px'>
        {accounts.length ? (
          accounts.map((accountProps, index) => (
            <AccountDetail key={index} {...accountProps} />
          ))
        ) : (
          <PaymentAccountSetup />
        )}
      </VStack>
    </ProfileDetailLayout>
  );
};

export const PaymentAccountSetup = () => (
  <HStack
    width='100%'
    pt='22px'
    pb='14px'
    align='center '
    justify='flex-start'
    gap='12px'
  >
    <Center
      boxSize='40px'
      minWidth='40px'
      rounded='full'
      bg='#F4F4F5'
      color='#27272A'
      fontSize='24px'
    >
      <BankFillIcon />
    </Center>
    <VStack
      flex='1'
      justify='center'
      align='flex-start'
      gap='6px'
      minHeight='40px'
    >
      <Text
        fontSize='16px'
        fontWeight='500'
        lineHeight='100%'
        color='#000000'
        title='Setup payout account'
        noOfLines={1}
      >
        Setup payout account
      </Text>
      <Text fontSize='13px' fontWeight='500' lineHeight='16px' color='#71717A'>
        Add a new settlement account.
      </Text>
    </VStack>
    <Center boxSize='24px' minWidth='24px' fontSize='16px' color='#71717A'>
      <AngleRightIcon />
    </Center>
  </HStack>
);

export const AccountDetail = ({
  accountNumber,
  bank,
  dateAdded
}: {
  accountNumber: string;
  bank: string;
  dateAdded: string;
}) => (
  <HStack
    width='100%'
    pt='22px'
    pb='14px'
    align='center '
    justify='flex-start'
    gap='12px'
    borderStyle='solid'
    borderColor='#E4E4E7'
    borderTopWidth={{ md: '1px', base: '0' }}
    _first={{ borderTopWidth: '0px' }}
  >
    <Center
      boxSize='40px'
      minWidth='40px'
      rounded='full'
      bg='#DCFCE7'
      color='#116932'
      fontSize='24px'
    >
      <BankFillIcon />
    </Center>
    <VStack justify='center' align='flex-start' gap='6px' minHeight='40px'>
      <Text
        fontSize='16px'
        fontWeight='500'
        lineHeight='100%'
        color='#000000'
        title={`${accountNumber} [${bank}]`}
        noOfLines={1}
      >{`${accountNumber} [${bank}]`}</Text>
      <Text
        fontSize='13px'
        fontWeight='500'
        lineHeight='16px'
        color='#71717A'
      >{`Added ${formatDate(dateAdded, { shortenMonth: true })}`}</Text>
    </VStack>
  </HStack>
);

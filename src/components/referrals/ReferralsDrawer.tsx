import { fetchReferrals } from '@/api/referrals';
import {
  Avatar,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  UseDisclosureReturn
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { VerifiedAccountIcon } from '../assets/referrals';
import Link from 'next/link';
import { EmptyState } from '@/layout/states/EmptyState';
import { CustomDrawerHeader } from '@/layout/drawer/CustomDrawerHeader';
import { ReferralDrawerEntrySkeleton } from '@/components/skeletons';
import { useSkeletonCount } from '@/utils/hooks/useSkeletonCount';

export const ReferralsDrawer = ({
  disclosure
}: {
  disclosure: UseDisclosureReturn;
}) => {
  const searchParams = useSearchParams();
  const skeletonCount = useSkeletonCount();
  const params = `?${searchParams?.toString()}`;

  const { data: referralsData, isLoading } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => fetchReferrals(params),
    enabled: !!disclosure?.isOpen
  });

  const referrals = referralsData?.data?.data;

  console.log({ referrals });

  return (
    <Drawer isOpen={disclosure?.isOpen} onClose={disclosure?.onClose}>
      <DrawerOverlay />
      <DrawerContent maxW={`500px`}>
        <CustomDrawerHeader title='Referrals' />
        <DrawerBody
          p={`24px`}
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px', // Width of vertical scrollbar
              height: '4px' // Height of horizontal scrollbar
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.300', // Scrollbar color
              borderRadius: '24px'
            }
          }}
        >
          {isLoading ? (
            <Stack gap={`40px`}>
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <ReferralDrawerEntrySkeleton key={i} />
              ))}
            </Stack>
          ) : !referrals?.length ? (
            <EmptyState />
          ) : (
            <Stack gap={`40px`}>
              {referrals?.map((user: any, i: number) => (
                <HStack
                  as={Link}
                  href={`/referrals/${user?.id}`}
                  key={i}
                  gap={'12px'}
                  flex={`1`}
                  cursor={`pointer`}
                >
                  <Center
                    boxSize={`48px`}
                    cursor={`pointer`}
                    position={`relative`}
                  >
                    <Avatar
                      src={user?.img || ``}
                      boxSize={`48px`}
                      name={user?.name}
                    />
                    {user?.kyc_status && <VerifiedAccountIcon />}
                  </Center>
                  <Stack
                    flex='1'
                    fontSize={'16px'}
                    color='#27272A'
                    lineHeight={'150%'}
                    fontWeight={'500'}
                    gap={'4px'}
                    textAlign={'left'}
                    letterSpacing={`0%`}
                  >
                    <Text>{user?.name}</Text>

                    <Text color={'#71717A'} fontSize={`14px`}>
                      {user?.email}, {user?.phone}
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

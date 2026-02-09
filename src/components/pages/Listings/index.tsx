'use client';

import { LayoutWrapper } from '@/layout/Wrapper';
import {
  Box,
  Flex,
  Link,
  List,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react';
import { type ListingType } from './dummy_data';
import Map from '@/components/map';
import { ListingCard } from '@/components/listing/card/ListingCard';
import { Filters } from '@/components/filters';
import { useQuery } from '@tanstack/react-query';
import { fetchListings } from '@/api/listings';
import { ListingCardSkeleton } from '@/components/skeletons';
import { useSkeletonCount } from '@/utils/hooks/useSkeletonCount';

export const ListingsPage = () => {
  const skeletonCount = useSkeletonCount();
  const { data, isLoading } = useQuery<{
    data?: { listings?: ListingType[] };
  }>({
    queryKey: ['all_listings'],
    queryFn: () => fetchListings()
  });

  const listings = data?.data?.listings ?? [];
  const markers = listings
    .filter(
      (l) =>
        typeof l.longitude === 'number' &&
        typeof l.latitude === 'number' &&
        Number.isFinite(l.longitude) &&
        Number.isFinite(l.latitude)
    )
    .map((l) => ({
      lng: l.longitude!,
      lat: l.latitude!,
      price: l.starting_from,
      units: l.units_available
    }));

  return (
    <LayoutWrapper>
      <Flex gap='0' flex='1'>
        <VStack
          width='100%'
          maxWidth={{ lg: '836px', base: 'none' }}
          p='0'
          gap='0'
        >
          <Filters />
          <List
            width='100%'
            display='flex'
            flexDirection='column'
            gap='20px'
            p={{
              lg: '0 32px 32px 40px',
              md: '0 24px 24px',
              base: '0 20px 24px'
            }}
          >
            {isLoading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <ListItem key={i} width='100%'>
                  <ListingCardSkeleton />
                </ListItem>
              ))
            ) : listings.length === 0 ? (
              <ListItem width='100%' py={8}>
                <Text color='#71717a' fontSize='14px'>
                  No listings found.
                </Text>
              </ListItem>
            ) : (
              listings.map((listing) => (
                <ListItem
                  as={Link}
                  href={`/listing/${listing.id}`}
                  textDecoration={"none !important"}
                  key={listing.id}
                  width='100%'
                  cursor='pointer'
                >
                  <ListingCard {...listing} />
                </ListItem>
              ))
            )}
          </List>
        </VStack>
        <Box
          flex='1'
          display={{ lg: 'block', base: 'none' }}
          minWidth={{ lg: '480px', base: '360px' }}
        >
          <Map
            markers={markers}
            defaultZoom={10}
            defaultCenter={{ lat: 6.6173, lng: 3.3553 }}
            containerStyling={{
              width: '100%',
              height: 'calc(100dvh - 64px - 49px)',
              position: 'sticky',
              top: '64px'
            }}
          />
        </Box>
      </Flex>
    </LayoutWrapper>
  );
};

'use client';
import { fetchSingleListing } from '@/api/listings';
import ImageContainer from '@/components/listingsProfile/ImageContainer';
import LocationAndProfile from '@/components/listingsProfile/LocationAndProfile';
import PropertyInfo from '@/components/listingsProfile/PropertyInfo';
import { listingDetailsProps } from '@/components/listingsProfile/types';
import { LayoutWrapper } from '@/layout/Wrapper';
import {
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export interface ListingsProfilePageProps {
  apiKey: string; // Forces host to pass required config
  userName?: string;
}

export const ListingsProfilePage = () => {
  const params = useParams();
  const listingId = (params.listing_id as string) ?? '';
  console.log({ params });
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['listingDetail', listingId],
    queryFn: () => fetchSingleListing(listingId)
  });
  const listingDetail: listingDetailsProps = data && data?.data?.project;
  const bundleId = listingDetail?.unit_id;
  console.log({ data, listingId, listingDetail });
  const images = listingDetail?.photo_urls
    ? listingDetail?.photo_urls?.map((item: any) => ({
        url: item?.photo || item,
        name: `${listingDetail?.name}'s image`,
        type: 'image'
      }))
    : [];
  return (
    <LayoutWrapper sidebarMenuStyle='expandable'>
      <Stack
        w={`100%`}
        p={{ base: `0px`, xl: '40px 71px' }}
        gap={{ base: `24px`, xl: '48px' }}
      >
        <ImageContainer isLoading={isLoading} listOfMedia={images} />
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          border={{ base: 'none', xl: '0.5px solid #D4D4D8' }}
          px={{ base: '20px', xl: '0px' }}
          borderRight={{ base: 'none', xl: 'none' }}
          borderLeft={{ base: 'none', xl: 'none' }}
        >
          <PropertyInfo listingDetails={listingDetail} />

          <LocationAndProfile listingDetails={listingDetail} />
        </Flex>
      </Stack>
    </LayoutWrapper>
  );
};

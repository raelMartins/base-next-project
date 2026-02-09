import {
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text
} from '@chakra-ui/react';
import {
  PiBedFill,
  PiCaretDownBold,
  PiCirclesThreePlusFill,
  PiCoinFill,
  PiMagnifyingGlass
} from 'react-icons/pi';

import { fixIcon } from '../../utils/helpers/fix-icon';

const BedFillIcon = fixIcon(PiBedFill);
const CaretDownBoldIcon = fixIcon(PiCaretDownBold);
const CirclesThreePlusFillIcon = fixIcon(PiCirclesThreePlusFill);
const CoinFillIcon = fixIcon(PiCoinFill);
const MagnifyingGlasscon = fixIcon(PiMagnifyingGlass);

export const FiltersAlt = () => {
  return (
    <Box width='100%'>
      <HStack
        width='100%'
        p='32px'
        pl='40px'
        gap='10px'
        bg='white'
        position='sticky'
        top=''
        as='form'
      >
        <FormControl
          flex='1'
          variant='unstyled'
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          gap='0'
          rounded='8px'
          border='1px solid'
          borderColor='#E4E4E7'
        >
          <FormLabel
            variant='unstyled'
            htmlFor='listings-search-bar-alt'
            display='block'
            width='fit-content'
            height='fit-content'
            m='0'
            p='0'
            pl='16px'
          >
            <Center
              height='52px'
              minWidth='24px'
              color='#52525B'
              fontSize='24px'
            >
              <MagnifyingGlasscon />
            </Center>
          </FormLabel>
          <Input
            id='listings-search-bar-alt'
            variant='unstyled'
            flex='1'
            pl='6px'
            pr='16px'
            height='52px'
            fontSize='16px'
            fontWeight='400'
            lineHeight='100%'
            letterSpacing='-1.1%'
            placeholder='Search projects...'
            borderWidth='0'
            _placeholder={{ color: '#5E5E5E' }}
          />
        </FormControl>
        <Box display='grid' gridTemplateColumns='repeat(3, auto)' gap='10px'>
          {[
            { title: 'Price', Icon: CoinFillIcon, id: 'price' },
            { title: 'Bed & Bath', Icon: BedFillIcon, id: 'beds-and-bath' },
            {
              title: 'More',
              Icon: CirclesThreePlusFillIcon,
              id: 'more-options-btn'
            }
          ].map(({ id, title, Icon }) => (
            <FormControl
              key={id}
              variant='unstyled'
              width='100%'
              display='flex'
              alignItems='center'
              justifyContent='flex-start'
              gap='8px'
              rounded='8px'
              border='1px solid'
              borderColor='#E4E4E7'
              px='16px'
            >
              <FormLabel
                variant='unstyled'
                htmlFor='listings-search-bar-alt'
                display='block'
                width='fit-content'
                height='fit-content'
                p='0'
                m='0'
              >
                <Center
                  height='52px'
                  minWidth='24px'
                  color='#3636E2'
                  fontSize='24px'
                >
                  <Icon />
                </Center>
              </FormLabel>
              <Text
                flex='1'
                noOfLines={1}
                fontSize='16px'
                fontWeight='500'
                letterSpacing='-1.1%'
                textAlign='left'
                lineHeight='100%'
              >
                {title}
              </Text>
              <Center ml='4px' boxSize='20px' minWidth='20px' color='#52525B'>
                <CaretDownBoldIcon fontSize='20px' />
              </Center>
            </FormControl>
          ))}
        </Box>
      </HStack>
    </Box>
  );
};

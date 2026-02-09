import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input
} from '@chakra-ui/react';
import { PiMagnifyingGlass } from 'react-icons/pi';

import { fixIcon } from '../../utils/helpers/fix-icon';

const MagnifyingGlassIcon = fixIcon(PiMagnifyingGlass);

export const Filters = () => {
  return (
    <HStack
      width='100%'
      p={{ lg: '32px', md: '28px 24px', base: '24px 20px' }}
      pl={{ lg: '40px' }}
      gap='10px'
      bg='white'
      position='sticky'
      top=''
    >
      <Flex
        as='form'
        align='center'
        justify='flex-start'
        gap='0'
        rounded='full'
        bg='#F4F4F5'
        width='100%'
      >
        <FormControl
          variant='unstyled'
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          gap='0'
        >
          <FormLabel
            variant='unstyled'
            htmlFor='listings-search-bar'
            display='block'
            width='fit-content'
            height='fit-content'
            p='0'
            m='0'
            pl={{ base: '14px', md: '18px' }}
          >
            <Center
              height={{ base: '44px', md: '52px' }}
              minWidth='20px'
              color='#52525B'
              fontSize={{ base: '18px', md: '20px' }}
            >
              <MagnifyingGlassIcon />
            </Center>
          </FormLabel>
          <Input
            id='listings-search-bar'
            variant='unstyled'
            flex='1'
            pl='6px'
            pr={{ base: '14px', md: '18px' }}
            height={{ base: '44px', md: '52px' }}
            fontSize={{ base: '14px', md: '16px' }}
            fontWeight='400'
            lineHeight='100%'
            letterSpacing='-1.1%'
            placeholder='Search Projects...'
            borderWidth='0'
            _placeholder={{ color: '#5E5E5E' }}
          />
        </FormControl>
      </Flex>
    </HStack>
  );
};

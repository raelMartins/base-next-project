import {
  Center,
  HStack,
  Input,
  InputProps,
  Text,
  VStack
} from '@chakra-ui/react';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { fixIcon } from '../../utils/helpers/fix-icon';

const AlertCircleOutlineIcon = fixIcon(IoAlertCircleOutline);

export type TextInputProps = InputProps & {
  errorMessage?: string;
  hideErrorMessage?: boolean;
};

export default function TextInput({
  type,
  isInvalid,
  errorMessage,
  hideErrorMessage,
  ...rest
}: TextInputProps) {
  return (
    <VStack width='100%' align='flex-start' gap='4px'>
      <Input
        variant='unstyled'
        width='100%'
        height='38px'
        px='12px'
        rounded='8px'
        fontSize='14px'
        fontWeight='500'
        lineHeight='21px'
        letterSpacing='-2%'
        border='1px solid'
        borderColor={isInvalid ? '#F9D2D2' : '#E4E4E7'}
        bg={isInvalid ? '#FEF2F2' : '#FAFAFA'}
        color={isInvalid ? '#DC2626' : '#52525B'}
        _placeholder={{ color: '#7A7A7A' }}
        _focus={{ bg: 'transparent' }}
        {...rest}
      />
      {isInvalid && errorMessage && !hideErrorMessage ? (
        <HStack
          width='100%'
          gap='4px'
          color='Red.6'
          justify='flex-start'
          align='flex-start'
        >
          <Center boxSize='16px' minWidth='16px'>
            <AlertCircleOutlineIcon size={16} width='16px' />
          </Center>
          <Text fontSize='12px' fontWeight='400' lineHeight='16px'>
            {errorMessage}
          </Text>
        </HStack>
      ) : null}
    </VStack>
  );
}

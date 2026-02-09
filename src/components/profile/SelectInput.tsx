import {
  Center,
  ChakraProps,
  FormControl,
  FormLabel,
  HStack,
  Select,
  SelectProps,
  Text,
  VStack
} from '@chakra-ui/react';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { fixIcon } from '../../utils/helpers/fix-icon';

const AlertCircleOutlineIcon = fixIcon(IoAlertCircleOutline);

export type SelectInputProps = SelectProps & {
  containerStyling?: ChakraProps;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  options: (string | { title: string; value: string })[];
};

export default function SelectInput({
  options,
  isInvalid,
  errorMessage,
  hideErrorMessage,
  containerStyling = {},
  ...rest
}: SelectInputProps) {
  return (
    <VStack width='100%' align='flex-start' gap='4px'>
      <FormControl variant='unstyled' p='0' m='0' width='100%'>
        <FormLabel
          variant='unstyled'
          width='100%'
          height='fit-content'
          p='0'
          m='0'
          pl='12px'
          {...containerStyling}
          border='1px solid'
          borderColor={isInvalid ? '#F9D2D2' : '#E4E4E7'}
          bg={isInvalid ? '#FEF2F2' : '#FAFAFA'}
          color={isInvalid ? '#DC2626' : '#52525B'}
        >
          <Select
            variant='unstyled'
            width='100%'
            height='38px'
            rounded='8px'
            fontSize='14px'
            fontWeight='500'
            lineHeight='21px'
            letterSpacing='-2%'
            _placeholder={{ color: '#7A7A7A' }}
            {...rest}
          >
            {options?.map((option, index) => (
              <option
                key={index}
                value={
                  typeof option == 'string'
                    ? option
                    : typeof option == 'object'
                      ? option.value
                      : undefined
                }
              >
                {typeof option == 'string'
                  ? option
                  : typeof option == 'object'
                    ? option.title
                    : undefined}
              </option>
            ))}
          </Select>
        </FormLabel>
      </FormControl>
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

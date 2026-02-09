import { Center, HStack, Text, VStack } from '@chakra-ui/react';

import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { PiPaperclip } from 'react-icons/pi';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { fixIcon } from '../../../utils/helpers/fix-icon';

const PaperclipIcon = fixIcon(PiPaperclip);
const AlertCircleOutlineIcon = fixIcon(IoAlertCircleOutline);

const BASE_URL = '';
export type FileResult = {
  file_url: string;
  message: string;
};

export function DefaultFileInput({
  isInvalid,
  errorMessage,
  placeholder,
  hideErrorMessage,
  getRootProps,
  getInputProps
}: DefaultFileStateProps) {
  return (
    <VStack width='100%' align='flex-start' gap='4px'>
      <HStack
        {...getRootProps()}
        align='center'
        justify='space-between'
        width='100%'
        height='38px'
        px='12px'
        rounded='8px'
        border='1px solid'
        borderColor={isInvalid ? '#F9D2D2' : '#E4E4E7'}
        bg={isInvalid ? '#FEF2F2' : '#FAFAFA'}
        color={isInvalid ? '#DC2626' : '#52525B'}
        _placeholder={{ color: '#7A7A7A' }}
        _hover={{ bg: 'transparent' }}
      >
        <input {...getInputProps()} />
        <Text
          fontSize='14px'
          fontWeight='500'
          lineHeight='21px'
          letterSpacing='-2%'
        >
          {placeholder}
        </Text>
        <Center boxSize='16px' minWidth='16px' fontSize='16px' color='#A1A1AA'>
          <PaperclipIcon />
        </Center>
      </HStack>
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

export interface DefaultFileStateProps {
  placeholder: string;
  isDragActive?: boolean;
  isInvalid: boolean;
  isUploading: boolean;
  uploadProgress: number;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  open: () => void;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
}

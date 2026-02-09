import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';

import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { IoAlertCircleOutline } from 'react-icons/io5';
import { HiMiniXCircle } from 'react-icons/hi2';
import { CustomFile, UploadedFileLink } from '.';

import { fixIcon } from '../../../utils/helpers/fix-icon';

const AlertCircleOutlineIcon = fixIcon(IoAlertCircleOutline);
const MiniXCircleIcon = fixIcon(HiMiniXCircle);

export function DefaultSelectedFileInput({
  files,
  isInvalid,
  errorMessage,
  isUploading,
  isUploaded,
  uploadProgress,
  hideErrorMessage,
  removeFile,
  getRootProps,
  getInputProps
}: SelectedFileStateProps) {
  const file = files[0];

  return (
    <VStack width='100%' align='flex-start' gap='4px'>
      <HStack
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
        pointerEvents={isUploading ? 'none' : undefined}
        _placeholder={{ color: '#7A7A7A' }}
        _hover={{ bg: 'transparent' }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Text
          fontSize='14px'
          fontWeight='500'
          lineHeight='21px'
          letterSpacing='-2%'
          opacity={isUploading ? 0.6 : 1}
          noOfLines={1}
        >
          {file.name}
          {isUploading && !isUploaded
            ? ` | ${uploadProgress.toPrecision(2)}%`
            : ''}
        </Text>
        <Button
          variant='unstyled'
          type='button'
          display='block'
          width='fit-content'
          height='fit-content'
          onClick={(event) => {
            event.preventDefault();
            removeFile(file.id);
          }}
        >
          <Center
            boxSize='20px'
            minWidth='20px'
            fontSize='20px'
            color='#E74B4B'
          >
            <MiniXCircleIcon />
          </Center>
        </Button>
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

export interface SelectedFileStateProps {
  files: CustomFile[];
  uploadedLinks: UploadedFileLink[];
  isInvalid: boolean;
  isUploaded: boolean;
  isUploading: boolean;
  uploadProgress: number;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  removeFile: (field: string) => void;
  openFileDialog: () => void;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
}

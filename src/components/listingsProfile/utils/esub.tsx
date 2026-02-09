import { Box, HStack, Text, useClipboard } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { CopyLinkIcon } from '../../assets/listings/copyLinkIcon';
import { QrCodeIcon } from '../../assets/listings/QrCode';

const Esub = ({ purchaseURL }: { purchaseURL: string }) => {
  const { onCopy, hasCopied } = useClipboard(purchaseURL);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
    const canvas = qrCodeRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = 'qrcode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  console.log({ hasCopied });
  return (
    <HStack spacing='16px'>
      <HStack spacing='4px'>
        <CopyLinkIcon baseColor={hasCopied ? '#27272a' : '#3636E2'} />
        <Text
          fontSize='16px'
          color='#3636E2'
          cursor='pointer'
          onClick={onCopy}
          fontWeight='600'
          lineHeight='100%'
          letterSpacing='0%'
        >
          Copy link
        </Text>
      </HStack>
      <HStack spacing='4px'>
        <QrCodeIcon />
        <Text
          fontSize='16px'
          color='#3636E2'
          cursor='pointer'
          fontWeight='600'
          lineHeight='100%'
          letterSpacing='0%'
          onClick={handleDownload}
        >
          Download QR
        </Text>
      </HStack>
      <Box display='none' ref={qrCodeRef}>
        <QRCodeCanvas
          value={purchaseURL || ''}
          size={256}
          bgColor='#ffffff'
          fgColor='#000000'
          level='H'
        />
      </Box>
    </HStack>
  );
};

export default Esub;

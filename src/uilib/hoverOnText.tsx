import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { truncateLongText } from '@/utils/functions/truncateLongText';

interface HoverTextProps {
  text: string;
  forPopUp?: Record<string, unknown>;
  popUpCom?: React.ReactNode;
  lens?: number;
  component?: (handlers: {
    onMouseLeave: () => void;
    onMouseEnter: () => void;
  }) => React.ReactNode;
  pContentStyle?: Record<string, unknown>;
  pBodyStyle?: Record<string, unknown>;
  [key: string]: unknown;
}

export default function HoverText({
  text,
  forPopUp,
  popUpCom,
  lens,
  component,
  pContentStyle,
  pBodyStyle,
  ...rest
}: HoverTextProps) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      placement='top'
      autoFocus={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        {component ? (
          component({
            onMouseLeave: () => (text ? onClose() : null),
            onMouseEnter: () => (text ? onOpen() : null)
          })
        ) : (
          <Text
            onMouseLeave={() =>
              (text?.length ?? 0) <= (lens ?? 17) ? null : onClose()
            }
            onMouseEnter={() =>
              (text?.length ?? 0) <= (lens ?? 17) ? null : onOpen()
            }
            fontSize={'16px'}
            fontWeight='500'
            textAlign={'left'}
            pr='7px'
            // wordWrap="break-word"
            textTransform='capitalize'
            wordBreak='break-word'
            overflowWrap='break-word'
            whiteSpace='normal'
            {...rest}
          >
            {truncateLongText(text, lens)?.truncatedText}
          </Text>
        )}
      </PopoverTrigger>
      <PopoverContent w='fit-content' {...pContentStyle}>
        <PopoverArrow />
        <PopoverBody
          boxShadow='0 1px 4px rgba(0, 0, 0, 0.08)'
          borderRadius='8px'
          {...pBodyStyle}
        >
          {popUpCom ? (
            popUpCom
          ) : (
            <Text
              w='fit-content'
              fontSize={'16px'}
              fontWeight='500'
              textAlign='center'
              whiteSpace='break-spaces'
              {...forPopUp}
            >
              {text}
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

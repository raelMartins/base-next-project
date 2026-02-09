import { HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface DescriptionItem {
  label: string;

  value?: string | number;
  component?: ReactNode;
}

interface YourComponentProps {
  descriptionList: DescriptionItem[];
  description: string;
}

const AboutThisProperty = ({
  descriptionList,
  description,
}: YourComponentProps) => {
  // const [isExpanded,setExp] = useState<boolean>()
  const { isOpen, onToggle } = useDisclosure();
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (element) {
      const hasOverflow = element.scrollHeight > element.offsetHeight;
      setIsTruncated(hasOverflow);
    }
  }, [description]);
  return !!descriptionList.length || description ? (
    <Stack spacing="20px">
      <Stack as="section" spacing="16px">
        <Text
          as="h2"
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="600"
          color="#000000
    "
          lineHeight="100%"
          letterSpacing="-2%"
        >
          About this property
        </Text>
        <Stack spacing="none">
          <Text
            fontSize="16px"
            fontWeight="400"
            lineHeight="24px"
            ref={textRef}
            letterSpacing="-1.1%"
            noOfLines={isOpen ? undefined : 3}
            color="#3F3F46"
            whiteSpace="pre-wrap"
          >
            {description}
          </Text>
          {isTruncated && (
            <Text
              as="span"
              fontSize="16px"
              fontWeight="500"
              lineHeight="24px"
              letterSpacing="-1.1%"
              cursor="pointer"
              color="#116932"
              onClick={onToggle}
              textDecor="underline"
            >
              See {isOpen ? "Less" : "More"}
            </Text>
          )}
        </Stack>
      </Stack>
      <Stack>
        {descriptionList.map((item, idx) => (
          <HStack key={idx} spacing="12px">
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="100%"
              letterSpacing="-1.1%"
              color="#191919"
            >
              {item.label}
            </Text>
            {item?.component ? (
              item.component
            ) : (
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="100%"
                letterSpacing="-1.1%"
                color="#3F3F46"
              >
                {item?.value}
              </Text>
            )}
          </HStack>
        ))}
      </Stack>
    </Stack>
  ) : null;
};

export default AboutThisProperty;

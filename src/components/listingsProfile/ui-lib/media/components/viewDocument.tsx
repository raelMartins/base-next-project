import React from "react";
import { ViewDocumentProp } from "../type";
import { AbsoluteCenter, Image, Link, Text, VStack } from "@chakra-ui/react";
// import document_icon from '@/images/icons/document-text.svg';

const ViewDocument = ({ srcObj }: ViewDocumentProp) => {
  return (
    <AbsoluteCenter
      minH={"full"}
      bg="rgba(255,255,255,0.6)"
      display="grid"
      placeContent="center"
      minW="full"
    >
      <VStack spacing="10px">
        <VStack spacing="4px">
          {/* <Image w="80px" h="auto" src={document_icon.src} alt="doc icon" /> */}
          <Text textStyle="labelTextLight">{srcObj?.name}</Text>
        </VStack>
        <Link fontSize="13px" href={srcObj?.url} isExternal>
          View Document
        </Link>
      </VStack>
    </AbsoluteCenter>
  );
};

export default ViewDocument;

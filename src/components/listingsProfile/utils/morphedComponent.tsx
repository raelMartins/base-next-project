import React, { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  useBreakpointValue,
  ModalProps,
  DrawerProps,
  ModalContentProps,
  Box,
} from "@chakra-ui/react";

// --- Types ---

interface MorphBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Combine Chakra's existing props for both types
type MorphRootProps = MorphBaseProps &
  Partial<Omit<ModalProps & DrawerProps, "children">>;

interface MorphSubComponentProps {
  children?: ReactNode;
  isMobile?: boolean; // Injected via React.cloneElement
  [key: string]: any;
}

// --- Main Component ---

const Morph = ({ isOpen, onClose, children, ...props }: MorphRootProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const Component = isMobile ? Drawer : Modal;

  // Injects the isMobile prop into all direct children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { isMobile });
    }
    return child;
  });

  return (
    <Component
      isOpen={isOpen}
      onClose={onClose}
      placement={isMobile ? "bottom" : undefined}
      {...props}
    >
      {childrenWithProps}
    </Component>
  );
};

// --- Sub-components ---

Morph.Overlay = ({ isMobile, ...props }: MorphSubComponentProps) =>
  isMobile ? <DrawerOverlay {...props} /> : <ModalOverlay {...props} />;

Morph.Content = ({
  isMobile,
  children,
  ...props
}: MorphSubComponentProps & ModalContentProps) => {
  const Component = isMobile ? DrawerContent : ModalContent;

  return (
    <Component borderTopRadius={isMobile ? "2xl" : undefined} {...props}>
      {/* Visual handle for mobile drawers */}
      {isMobile && (
        <Box
          w="40px"
          h="5px"
          bg="gray.300"
          borderRadius="full"
          mx="auto"
          mt={3}
          mb={-2}
        />
      )}
      {children}
    </Component>
  );
};

Morph.Header = ({ isMobile, ...props }: MorphSubComponentProps) =>
  isMobile ? <DrawerHeader {...props} /> : <ModalHeader {...props} />;

Morph.Body = ({ isMobile, ...props }: MorphSubComponentProps) =>
  isMobile ? <DrawerBody {...props} /> : <ModalBody {...props} />;

Morph.Footer = ({ isMobile, ...props }: MorphSubComponentProps) =>
  isMobile ? <DrawerFooter {...props} /> : <ModalFooter {...props} />;

Morph.CloseButton = ModalCloseButton;

export default Morph;

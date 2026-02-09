import { CustomDrawerHeader } from '@/layout/drawer/CustomDrawerHeader';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Grid,
  GridItem,
  UseDisclosureReturn
} from '@chakra-ui/react';
import {
  InputField,
  InputFieldProps
} from '../../profile/BasicAndNextOfKinDetails';

export const ReportTransactionDrawer = ({
  disclosure
}: {
  disclosure: UseDisclosureReturn;
}) => {
  const handleClose = () => {
    disclosure?.onClose();
  };
  const formFields = [
    {
      label: 'Transaction ID',
      id: 'transaction_id',
      name: 'transaction_id',
      placeholder: 'Enter Transaction ID',
      onChange: () => {},
      onBlur: () => {}
    },
    {
      label: 'Transaction Date',
      id: 'transaction_date',
      name: 'transaction_date',
      placeholder: 'Enter Transaction Date',
      onChange: () => {},
      onBlur: () => {}
    },
    {
      label: 'Notes',
      id: 'notes',
      name: 'notes',
      onChange: () => {},
      onBlur: () => {}
    }
  ];
  return (
    <Drawer isOpen={disclosure?.isOpen} onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent maxW={`500px`}>
        <CustomDrawerHeader title='Report a Transaction' />
        <DrawerBody
          p={`24px`}
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px', // Width of vertical scrollbar
              height: '4px' // Height of horizontal scrollbar
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.300', // Scrollbar color
              borderRadius: '24px'
            }
          }}
        >
          <Grid width='100%' gridTemplateColumns={'1fr'} gap={{ base: '16px' }}>
            {formFields.map((inputProps, index) => (
              <GridItem
                colSpan={{ xl: index >= 6 ? 2 : 1, base: 1 }}
                key={inputProps.label}
              >
                <InputField
                  key={inputProps.label}
                  {...(inputProps as unknown as InputFieldProps)}
                />
              </GridItem>
            ))}
          </Grid>
        </DrawerBody>
        <DrawerFooter p={`24px`}>
          <Button
            w={`100%`}
            borderRadius={`full`}
            bg={`#000`}
            color={`#fff`}
            fontSize={`12px`}
            lineHeight={`150%`}
            textTransform={`capitalize`}
            fontWeight={`400`}
            p={`8px`}
          >
            Proceed
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

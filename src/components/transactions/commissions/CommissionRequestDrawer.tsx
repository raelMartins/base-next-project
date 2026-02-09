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

export const CommissionRequestDrawer = ({
  disclosure
}: {
  disclosure: UseDisclosureReturn;
}) => {
  const handleClose = () => {
    disclosure?.onClose();
  };
  const formFields = [
    {
      label: 'What listing are you requesting commission for?',
      id: 'listing_select',
      name: 'listing_select',
      placeholder: 'Choose Listing',

      options: [
        { title: 'Listing A', value: 'listing_a' },
        { title: 'Listing B', value: 'listing_b' }
      ],
      inputType: 'select',
      onChange: () => {},
      onBlur: () => {}
    },
    {
      label: 'What unit did you sell?',
      id: 'unit_select',
      name: 'unit_select',
      placeholder: 'Choose unit',

      options: [
        { title: 'Unit A', value: 'unit_a' },
        { title: 'Unit B', value: 'unit_b' }
      ],
      inputType: 'select',
      onChange: () => {},
      onBlur: () => {}
    },
    {
      label: 'Subscriber’s Email Address',
      id: 'subscriber_email',
      placeholder: 'Enter Subscriber’s email address',
      name: 'subscriber_email',
      onChange: () => {},
      onBlur: () => {}
    },
    {
      label: 'Date Sold',
      id: 'date_sold',
      name: 'date_sold',
      inputType: 'date_of_birth',
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
        <CustomDrawerHeader title='Commission Request' />
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

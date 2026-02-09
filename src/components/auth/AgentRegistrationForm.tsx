'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { store_name } from '@/constants/routes';
import { submitAgentApplication } from '@/api/auth';

function formatDateInput(value: string): string {
  const numeric = value.replace(/\D/g, '');
  if (numeric.length <= 2) return numeric;
  if (numeric.length <= 4) return `${numeric.slice(0, 2)}/${numeric.slice(2)}`;
  return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}/${numeric.slice(4, 8)}`;
}

export type AgentRegistrationFormProps = {
  email: string;
  onSuccess: () => void;
};

export const AgentRegistrationForm = ({
  email,
  onSuccess
}: AgentRegistrationFormProps) => {
  const toast = useToast();
  const storeName = store_name();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    highest_education: '',
    marital_status: '',
    employment_status: '',
    company_name: '',
    address: '',
    company_address: ''
  });
  const [documentBase64, setDocumentBase64] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setForm((prev) => ({ ...prev, date_of_birth: formatted }));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.replace(/^data:[^;]+;base64,/, '');
      setDocumentBase64(base64 ? [base64] : []);
    };
    reader.readAsDataURL(file);
  };

  const isValid =
    !!form.first_name?.trim() &&
    !!form.last_name?.trim() &&
    !!form.middle_name?.trim() &&
    !!form.phone?.trim() &&
    !!form.gender &&
    !!form.highest_education &&
    !!form.marital_status &&
    !!form.employment_status &&
    !!form.address?.trim() &&
    !!form.date_of_birth?.trim() &&
    termsAccepted;

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      submitAgentApplication(payload),
    onSuccess: () => {
      onSuccess();
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description:
          err?.response?.data?.message ??
          err?.response?.message ??
          'Something went wrong. Please try again.',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right'
      });
    }
  });

  const handleSubmit = () => {
    const [d, m, y] = form.date_of_birth.split('/');
    const dateOfBirthBackend =
      d && m && y ? `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}` : null;

    const payload: Record<string, unknown> = {
      ...form,
      email,
      store_name: storeName,
      date_of_birth: dateOfBirthBackend,
      company_address: form.company_address?.toLowerCase() ?? '',
      address: form.address?.toLowerCase() ?? '',
      document: documentBase64.length ? documentBase64 : null
    };

    mutate(payload);
  };

  return (
    <Box
      maxW='640px'
      w={{ base: '100%', lg: '640px' }}
      bg='#f5f5f5'
      px={{ base: '24px', md: '40px' }}
      py='32px'
      borderRadius={5}
      boxShadow={
        '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
      }
    >
      <VStack align='stretch' spacing={6}>
        <Text fontSize='23px' fontWeight={600} color='#000000'>
          Realtor application
        </Text>
        <Text color='#5b5b5b' fontSize='14px'>
          No account was found for this email. Complete the form below to submit
          an application.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>First name</FormLabel>
            <Input
              value={form.first_name}
              onChange={(e) => update('first_name', e.target.value)}
              placeholder='Enter first name'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Last name</FormLabel>
            <Input
              value={form.last_name}
              onChange={(e) => update('last_name', e.target.value)}
              placeholder='Enter last name'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Middle name</FormLabel>
            <Input
              value={form.middle_name}
              onChange={(e) => update('middle_name', e.target.value)}
              placeholder='Enter middle name'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='13px'>Email</FormLabel>
            <Input
              value={email}
              isReadOnly
              fontSize='14px'
              bg='gray.100'
              borderColor='gray.200'
              _readOnly={{ cursor: 'not-allowed' }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Phone number</FormLabel>
            <Input
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder='Enter phone number'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Date of birth</FormLabel>
            <Input
              value={form.date_of_birth}
              onChange={handleDateChange}
              placeholder='DD/MM/YYYY'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Gender</FormLabel>
            <Box
              as='select'
              value={form.gender}
              onChange={(e) =>
                update('gender', (e.target as HTMLSelectElement).value)
              }
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
              borderRadius='md'
              borderWidth='1px'
              px={3}
              py={2}
              w='full'
            >
              <option value=''>Select gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </Box>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Marital status</FormLabel>
            <Box
              as='select'
              value={form.marital_status}
              onChange={(e) =>
                update('marital_status', (e.target as HTMLSelectElement).value)
              }
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
              borderRadius='md'
              borderWidth='1px'
              px={3}
              py={2}
              w='full'
            >
              <option value=''>Select status</option>
              <option value='Single'>Single</option>
              <option value='Married'>Married</option>
            </Box>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Highest education</FormLabel>
            <Box
              as='select'
              value={form.highest_education}
              onChange={(e) =>
                update(
                  'highest_education',
                  (e.target as HTMLSelectElement).value
                )
              }
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
              borderRadius='md'
              borderWidth='1px'
              px={3}
              py={2}
              w='full'
            >
              <option value=''>Select level</option>
              <option value='High School Diploma'>High School Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value='Post-Secondary Certificate'>
                Post-Secondary Certificate
              </option>
              <option value='Some college'>Some college</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value='PHD'>PHD</option>
            </Box>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='13px'>Employment status</FormLabel>
            <Box
              as='select'
              value={form.employment_status}
              onChange={(e) =>
                update(
                  'employment_status',
                  (e.target as HTMLSelectElement).value
                )
              }
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
              borderRadius='md'
              borderWidth='1px'
              px={3}
              py={2}
              w='full'
            >
              <option value=''>Select status</option>
              <option value='Employed'>Employed</option>
              <option value='Unemployed'>Unemployed</option>
              <option value='Self employed'>Self employed</option>
            </Box>
          </FormControl>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel fontSize='13px'>Residential address</FormLabel>
              <Input
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder='Enter residential address'
                fontSize='14px'
                bg='white'
                borderColor='gray.200'
              />
            </FormControl>
          </GridItem>
          <FormControl>
            <FormLabel fontSize='13px'>Company name (optional)</FormLabel>
            <Input
              value={form.company_name}
              onChange={(e) => update('company_name', e.target.value)}
              placeholder='Company name'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='13px'>Company address (optional)</FormLabel>
            <Input
              value={form.company_address}
              onChange={(e) => update('company_address', e.target.value)}
              placeholder='Company address'
              fontSize='14px'
              bg='white'
              borderColor='gray.200'
            />
          </FormControl>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel fontSize='13px'>Upload ID (optional)</FormLabel>
              <Input
                type='file'
                accept='image/*,.pdf'
                onChange={handleDocumentChange}
                fontSize='14px'
                py={1.5}
                sx={{ '::file-selector-button': { display: 'none' } }}
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <Divider />

        <Checkbox
          isChecked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          colorScheme='gray'
          size='sm'
        >
          <Text as='span' fontSize='13px' color='#5b5b5b'>
            By submitting, you agree to our Privacy Policy and Terms of Service.
          </Text>
        </Checkbox>

        <Flex justify='flex-end' pt={2}>
          <Button
            onClick={handleSubmit}
            isLoading={isPending}
            isDisabled={!isValid}
            bg='#000'
            color='white'
            borderRadius='full'
            fontSize='14px'
            px={8}
            _hover={{ bg: 'gray.800' }}
          >
            Submit application
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

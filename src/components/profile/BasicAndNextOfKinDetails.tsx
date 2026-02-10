import { useRef } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import TextInput, { TextInputProps } from "@/components/profile/TextInput";
import SelectInput, {
  SelectInputProps,
} from "@/components/profile/SelectInput";
import FileInput, { FileInputProps } from "@/components/profile/FileInput";

import { ProfileDetailLayout } from "./ProfileDetailsLayout";
import { useProfileSettings } from "@/utils/hooks/useProfileSettings";

export type InputFieldProps = TextInputProps &
  SelectInputProps &
  FileInputProps & {
    label: string;
    inputType?:
      | "text"
      | "email"
      | "number"
      | "tel"
      | "date"
      | "file"
      | "select";
  };

export const InputField = ({
  id,
  label,
  inputType = "text",
  ...rest
}: InputFieldProps) => {
  return (
    <FormControl
      variant="unstyled"
      p="0"
      m="0"
      width="100%"
      display="flex"
      flexDirection="column"
      gap="6px"
    >
      <FormLabel htmlFor={id} variant="unstyled" p="0" m="0">
        <Text
          fontSize="13px"
          fontWeight="500"
          lineHeight="150%"
          letterSpacing="-1.1%"
          color="#18181B"
        >
          {label}
        </Text>
      </FormLabel>
      {inputType == "select" ? (
        <SelectInput id={id} {...rest} />
      ) : inputType == "file" ? (
        <FileInput {...rest} />
      ) : (
        <TextInput id={id} type={inputType} {...rest} />
      )}
    </FormControl>
  );
};

const MARITAL_OPTIONS = [
  { title: "Single", value: "Single" },
  { title: "Married", value: "Married" },
  { title: "Divorced", value: "Divorced" },
  { title: "Widowed", value: "Widowed" },
];

const EDUCATION_OPTIONS = [
  { title: "High School", value: "High School" },
  { title: "Bachelor's Degree", value: "Bachelor's Degree" },
  { title: "University", value: "University" },
  { title: "Masters", value: "Masters" },
];

function getFormBody(form: HTMLFormElement): Record<string, unknown> {
  const formData = new FormData(form);
  const body: Record<string, unknown> = {};
  const str = (key: string) => {
    const v = formData.get(key);
    return v != null && v !== "" ? String(v) : undefined;
  };
  const phone = str("phone_number");
  if (phone !== undefined) body.phone = phone;
  const alternatePhone = str("alternate_phone_number");
  if (alternatePhone !== undefined) body.alternate_phone_number = alternatePhone;
  const dob = str("date_of_birth");
  if (dob !== undefined) body.date_of_birth = dob;
  const marital = str("marital_status");
  if (marital !== undefined) body.marital_status = marital;
  const education = str("level_of_education");
  if (education !== undefined) body.highest_education = education;
  const companyName = str("company_name");
  if (companyName !== undefined) body.company_name = companyName;
  const companyAddress = str("company_address");
  if (companyAddress !== undefined) body.company_address = companyAddress;
  const address = str("residential_address");
  if (address !== undefined) body.address = address;
  return body;
}

export const BasicDetails = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const toast = useToast();
  const { user, verification, updateSettings, isUpdatingSettings } =
    useProfileSettings();
  const docs = verification?.docs ?? [];
  const identityDoc = docs[0];
  const identityDocDefaultValue = identityDoc
    ? [
        {
          id: String(identityDoc.id),
          link: identityDoc.document,
          type: "image",
          name: "Identity document",
          category: "identity_document",
          date: identityDoc.created_at,
          file: new File([], ""),
          preview: undefined
        }
      ]
    : undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const body = getFormBody(formRef.current);
    updateSettings(body, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your basic details have been saved.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (err: unknown) => {
        const message =
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
            ? String((err.response.data as { message?: unknown }).message)
            : "Something went wrong. Please try again.";
        toast({
          title: "Update failed",
          description: message,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      },
    });
  };

  return (
    <ProfileDetailLayout
      heading="Basic Details"
      buttonText={isUpdatingSettings ? "Saving…" : "Save"}
      buttonAction={() => formRef.current?.requestSubmit()}
      buttonDisabled={isUpdatingSettings}
    >
    <form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
    <Grid
      width="100%"
      gridTemplateColumns={{ xl: "repeat(2, 1fr)", base: "1fr" }}
      columnGap="18px"
      rowGap={{ xl: "28px", base: "24px" }}
    >
      {[
        {
          label: "Phone Number",
          id: "profile_phone_number_input",
          name: "phone_number",
          inputType: "tel",
          defaultValue: user?.phone ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Alternate Phone Number",
          id: "profile_alternate_phone_number_input",
          name: "alternate_phone_number",
          inputType: "tel",
          defaultValue: "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Date of Birth",
          id: "profile_date_of_birth",
          name: "date_of_birth",
          inputType: "date",
          defaultValue: user?.date_of_birth ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Marital Status",
          id: "profile_marital_status",
          name: "marital_status",
          inputType: "select",
          options: MARITAL_OPTIONS,
          defaultValue: user?.marital_status ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Highest Level of Education",
          id: "profile_level_of_education",
          name: "level_of_education",
          inputType: "select",
          options: EDUCATION_OPTIONS,
          defaultValue: user?.highest_education ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Company’s Name",
          id: "profile_company_name",
          name: "company_name",
          defaultValue: user?.company_name ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Company’s Address",
          id: "profile_company_address",
          name: "company_address",
          defaultValue: user?.company_address ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Residential Address",
          id: "profile_residential_address",
          name: "residential_address",
          defaultValue: user?.address ?? "",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Identity Document",
          id: "profile_identity_document",
          name: "identity_document",
          category: "identity_document",
          placeholder: "Select a File",
          inputType: "file",
          defaultValue: identityDocDefaultValue,
          isInvalid: false,
          handleFileChange: () => {},
          handleFileError: () => {},
          onUploadFailed: () => {},
          onUploadSuccess: () => {},
        },
      ].map((inputProps, index) => (
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
    </form>
  </ProfileDetailLayout>
  );
};

export const NextOfKinDetails = () => (
  <ProfileDetailLayout heading="Next of Kin" buttonText="Edit">
    <Grid
      width="100%"
      gridTemplateColumns={{ xl: "repeat(2, 1fr)", base: "1fr" }}
      columnGap="18px"
      rowGap={{ xl: "28px", base: "24px" }}
    >
      {[
        {
          label: "Full Name",
          id: "next_of_kin_phone_number_input",
          name: "full_name",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Email Address",
          id: "next_of_kin_email_address",
          name: "email",
          inputType: "email",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Relationship",
          id: "next_of_kin_relationship",
          name: "relationship",
          inputType: "select",
          options: [
            { title: "Mother", value: "mother" },
            { title: "Father", value: "father" },
            { title: "Sibling", value: "sibling" },
            { title: "Uncle", value: "uncle" },
            { title: "Aunt", value: "aunt" },
            { title: "Guardian", value: "guardian" },
          ],
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Date of Birth",
          id: "next_of_kin_date_of_birth",
          name: "date_of_birth",
          inputType: "date",
          onChange: () => {},
          onBlur: () => {},
        },
        {
          label: "Residential Address",
          id: "next_of_kin_residential_address",
          name: "residential_address",
          onChange: () => {},
          onBlur: () => {},
        },
      ].map((inputProps, index) => (
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
  </ProfileDetailLayout>
);

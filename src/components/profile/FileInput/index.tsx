import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { useDropzone, FileRejection } from "react-dropzone";

import axios, { AxiosProgressEvent } from "axios";
import { getUserTimezone } from "@/utils/helpers/datetime";
import { DefaultFileInput, DefaultFileStateProps } from "./DefaultFileInput";
import {
  DefaultSelectedFileInput,
  SelectedFileStateProps,
} from "./DefaultSelectedFileInput";

const BASE_URL = "";

export type FileResult = {
  file_url: string;
  message: string;
};

export interface CustomFile {
  id: string;
  preview?: string;
  link?: string;
  file: File;
  type: string;
  name: string;
  category: string;
  date: string;
}

export interface UploadedFileLink {
  id: string;
  link: string;
  type: string;
  name: string;
  category: string;
  date: string;
}

export interface FileInputProps {
  isInvalid: boolean;
  uploadUrl?: string;
  placeholder: string;
  handleFileChange: (file: CustomFile[]) => void;
  handleFileError: (errorMessage: string) => void;
  onUploadFailed?: (errorMessage: string) => void;
  onUploadSuccess: (files: UploadedFileLink[]) => void;
  category: string;
  allowMultiple?: boolean;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  renderDefaultState?: (props: DefaultFileStateProps) => JSX.Element;
  renderSelectedState?: (props: SelectedFileStateProps) => JSX.Element;
  defaultValue?: (CustomFile & UploadedFileLink)[];
  autoUpload?: boolean;
  parentIsUploading?: boolean;
  name?: string;
  fileSubtext?: string;
  maxFiles?: number;
  errorMessage?: string;
  hideErrorMessage?: boolean;
}

export default function FileInput({
  isInvalid,
  errorMessage,
  placeholder,
  uploadUrl = `${BASE_URL}/storage/upload/`,
  handleFileChange,
  handleFileError,
  onUploadFailed,
  onUploadSuccess,
  category,
  allowMultiple = false,
  acceptedFileTypes = "text/csv",
  maxFileSize = 104857600000, // 100MB
  renderDefaultState,
  renderSelectedState,
  defaultValue,
  autoUpload = false,
  parentIsUploading = false,
  name = "file",
  maxFiles = 1,
}: FileInputProps) {
  const toast = useToast();
  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>([]);
  const [uploadedLinks, setUploadedLinks] = useState<UploadedFileLink[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const Timezone = getUserTimezone();

  useEffect(() => {
    if (!defaultValue || selectedFiles.length || uploadedLinks.length) return;
    setSelectedFiles(defaultValue);
    setUploadedLinks(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setUploadedLinks([]);
      setUploadProgress(0);
      setIsUploading(false);

      if (fileRejections.length > 0) {
        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((err) => {
            toast({
              title: "Could not add file.",
              description: `${file.name}: ${err.message}`,
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            });

            handleFileError(err.message);
          });
        });
      }

      if (acceptedFiles.length > 0) {
        const newFilesWithPreviews: CustomFile[] = acceptedFiles.map((file) => {
          const id = `${file.name}-${file.size}-${Date.now()}`;
          let preview: string | undefined;

          if (
            file.type.startsWith("image/") ||
            file.type.startsWith("video/")
          ) {
            preview = URL.createObjectURL(file);
          }

          return { id, file, preview } as CustomFile;
        });

        if (!allowMultiple) {
          setSelectedFiles((prev) => {
            prev.forEach(
              (file) => file.preview && URL.revokeObjectURL(file.preview),
            );
            const newFiles = newFilesWithPreviews.slice(0, 1);
            handleFileChange(newFiles);
            return newFiles;
          });
        } else {
          setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...newFilesWithPreviews];
            handleFileChange(newFiles);
            return newFiles;
          });
        }
      }
    },
    [allowMultiple, toast, setSelectedFiles],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: allowMultiple,
    maxFiles: maxFiles,
    maxSize: maxFileSize,
    accept: acceptedFileTypes
      ? acceptedFileTypes.split(",").reduce(
          (acc, type) => {
            acc[type.trim()] = [];
            return acc;
          },
          {} as { [key: string]: string[] },
        )
      : undefined,
  });

  const uploadFiles = useCallback(async (): Promise<void> => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected.",
        description: "Please select files to upload.",
        status: "warning",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const uploadedLinksArray: UploadedFileLink[] = [];

    try {
      for (const selectedFile of selectedFiles) {
        if (!selectedFile?.link) {
          const formData = new FormData();
          formData.append(name, selectedFile.file, selectedFile.name);

          const response = await axios.post<FileResult>(uploadUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Timezone,
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1),
              );
              setUploadProgress(percentCompleted);
            },
          });

          const link = response.data.file_url;

          if (link) {
            uploadedLinksArray.push({
              link,
              type: selectedFile.file.type,
              id: selectedFile.id,
              name: selectedFile.file.name,
              category,
              date: new Date().toLocaleDateString(),
            });
          } else {
            throw new Error("missing file url.");
          }
        } else {
          uploadedLinksArray.push(selectedFile as UploadedFileLink);
        }
      }

      setUploadedLinks(uploadedLinksArray);
      onUploadSuccess(uploadedLinksArray);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? /invalid/i.test(error.response?.data?.message)
          ? "File format not supported"
          : "Could not upload file"
        : ((error as Error)?.message ?? "An unknown error occurred.");

      if (onUploadFailed) onUploadFailed(errorMessage);
      else
        toast({
          title: "Upload failed.",
          description: errorMessage,
          status: "error",
        });

      setUploadProgress(0);
      setSelectedFiles([]);
      setUploadedLinks([]);
    } finally {
      setIsUploading(false);
    }
  }, [selectedFiles, uploadUrl, name, onUploadSuccess, allowMultiple, toast]);

  useEffect(() => {
    if (
      parentIsUploading ||
      (autoUpload &&
        selectedFiles.length > 0 &&
        !isUploading &&
        uploadedLinks.length === 0)
    ) {
      uploadFiles();
    }
  }, [
    parentIsUploading,
    autoUpload,
    selectedFiles,
    isUploading,
    uploadedLinks.length,
    uploadFiles,
  ]);

  const removeFile = useCallback(
    (fileId: string) => {
      setSelectedFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((f) => f.id === fileId);
        if (fileToRemove && fileToRemove.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const newFiles = prevFiles.filter((f) => f.id !== fileId);
        handleFileChange(newFiles);
        return newFiles;
      });

      const newLinkArray = uploadedLinks.filter((link) => link.id !== fileId);
      setUploadedLinks(newLinkArray);
      if (autoUpload) onUploadSuccess(newLinkArray);
    },
    [uploadedLinks, onUploadSuccess, allowMultiple],
  );

  const isSelectedState = selectedFiles.length > 0;

  return isSelectedState
    ? renderSelectedState
      ? renderSelectedState({
          errorMessage,
          files: selectedFiles,
          uploadedLinks,
          isUploading,
          isInvalid,
          uploadProgress,
          isUploaded: Math.round(uploadProgress) >= 100,
          removeFile,
          openFileDialog: open,
          getInputProps,
          getRootProps,
        })
      : DefaultSelectedFileInput({
          errorMessage,
          files: selectedFiles,
          uploadedLinks,
          isUploading,
          uploadProgress,
          isInvalid,
          isUploaded: Math.round(uploadProgress) >= 100,
          removeFile,
          openFileDialog: open,
          getInputProps,
          getRootProps,
        })
    : renderDefaultState
      ? renderDefaultState({
          errorMessage,
          placeholder,
          isDragActive,
          open,
          getInputProps,
          getRootProps,
          isUploading,
          uploadProgress,
          isInvalid,
        })
      : DefaultFileInput({
          errorMessage,
          placeholder,
          isDragActive,
          open,
          getInputProps,
          getRootProps,
          isUploading,
          uploadProgress,
          isInvalid,
        });
}

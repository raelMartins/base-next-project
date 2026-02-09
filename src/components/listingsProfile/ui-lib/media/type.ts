// import {CustomFile} from '@/uiLib/upload/type';
import { UseDisclosureReturn } from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface MediaCarouselProps {
  modal: UseDisclosureReturn;
  setSelectedMedia: Dispatch<SetStateAction<number>>;
  listOfMedia: SrcObjProp[];
  selectedMedia: number;
}
export type SrcObjProp = {
  url: string;
  name: string;
  type: "document" | "image" | "video";
};

export type ViewDocumentProp = {
  srcObj: SrcObjProp;
};
export type VideoViewProps = {
  setVolume: Dispatch<SetStateAction<number>>;
  videoRef: RefObject<HTMLVideoElement>;
  setDuration: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  srcObj: SrcObjProp;
  isPlaying: boolean;
};

export type ExpandedImageProps = {
  imageContainerRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
  srcObj: SrcObjProp;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
  modal: UseDisclosureReturn;
  isHovered: boolean;
  currentZoom: number;
};

export type ControlsProps = {
  videoRef: RefObject<HTMLVideoElement>;

  setCurrentTime: Dispatch<SetStateAction<number>>;
  setVolume: Dispatch<SetStateAction<number>>;
  imageRef: RefObject<HTMLImageElement>;

  setCurrentZoom: Dispatch<SetStateAction<number>>;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
  isHovered: boolean;
  selectedMedia: number;
  setSelectedMedia: Dispatch<SetStateAction<number>>;
  listOfMedia: SrcObjProp[];
  srcObj: SrcObjProp;
  currentTime: number;
  duration: number;
  currentZoom: number;
  volume: number;
};

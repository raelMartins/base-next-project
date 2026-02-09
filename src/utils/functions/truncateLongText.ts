export interface TruncateResult {
  truncatedText: string;
  originalText: string | undefined;
  isTruncated: boolean;
}

export const truncateLongText = (
  txt: string | number | null | undefined,
  lens?: number
): TruncateResult => {
  const length = lens ?? 17;
  const textToTruncate = txt?.toString();
  return {
    truncatedText:
      (textToTruncate?.length ?? 0) <= length
        ? textToTruncate ?? ""
        : (textToTruncate?.slice(0, length) ?? "") + "...",
    originalText: textToTruncate,
    isTruncated: (textToTruncate?.length ?? 0) > length,
  };
};

export const capitalizeTextFormat = (str: string | null | undefined): string => {
  if (str == null) return "";
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

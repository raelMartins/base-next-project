export const getOrdinal = (number: number): string => {
  if (typeof number !== "number") return "";
  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
    return number + "th";
  }
  const suffix = suffixes[lastDigit] || "th";
  return number + suffix;
};

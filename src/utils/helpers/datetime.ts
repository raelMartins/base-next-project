export const getUserTimezone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const MONTHS_ARRAY = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (
  date: string,
  options?: { shortenMonth?: boolean },
) => {
  try {
    const dateObj = new Date(date);
    const month = MONTHS_ARRAY[dateObj.getMonth()]?.substring(
      0,
      options?.shortenMonth ? 3 : undefined,
    );
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch (error) {
    return "";
  }
};

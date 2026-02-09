import { CommissionRequestInstance, InspectionRequestInstance } from './types';
import { InspectionRequest } from './InspectionRequest';
import { CommissionRequest } from './CommissionRequest';
import moment from 'moment';
export const monthDayYear = (date: Date | string) => {
  return moment(date).format('MMMM Do YYYY');
};

export function formatTimestamp(timestamp: string, hoursOnly = false) {
  const now = new Date();
  const date = new Date(timestamp);

  const timeDifference =
    Date.parse(now.toISOString()) - Date.parse(date.toISOString());
  const seconds = Math.floor(timeDifference / 1000);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (days < 15 && !hoursOnly) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else {
    return monthDayYear(date);
  }
}
export const Request = ({
  data,
  tab
}: {
  data: CommissionRequestInstance | InspectionRequestInstance;
  tab: string;
}) => {
  return tab === 'commission' ? (
    <CommissionRequest data={data as CommissionRequestInstance} />
  ) : (
    <InspectionRequest data={data as InspectionRequestInstance} />
  );
};

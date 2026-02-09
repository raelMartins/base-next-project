import { useQuery } from '@tanstack/react-query';
import { fetchRealtorSettingsInfo } from '@/api/profile';
import {
  getProfilePayload,
  ProfileSettingsResponse
} from '@/api/profile.types';

export const PROFILE_SETTINGS_QUERY_KEY = ['account-settings-info'] as const;

export function useProfileSettings() {
  const query = useQuery({
    queryKey: PROFILE_SETTINGS_QUERY_KEY,
    queryFn: fetchRealtorSettingsInfo
  });

  const payload: ProfileSettingsResponse | null =
    query.data?.data != null ? getProfilePayload(query.data.data) : null;

  return {
    ...query,
    profile: payload,
    user: payload?.user ?? null,
    verification: payload?.verification ?? null,
    banks: payload?.banks ?? []
  };
}

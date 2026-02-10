import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRealtorSettingsInfo, updateRealtorSettings } from '@/api/profile';
import {
  getProfilePayload,
  ProfileSettingsResponse
} from '@/api/profile.types';

export const PROFILE_SETTINGS_QUERY_KEY = ['account-settings-info'] as const;

export function useProfileSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: PROFILE_SETTINGS_QUERY_KEY,
    queryFn: fetchRealtorSettingsInfo
  });

  const updateMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => updateRealtorSettings(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_SETTINGS_QUERY_KEY });
    }
  });

  const payload: ProfileSettingsResponse | null =
    query.data?.data != null ? getProfilePayload(query.data.data) : null;

  return {
    ...query,
    profile: payload,
    user: payload?.user ?? null,
    verification: payload?.verification ?? null,
    banks: payload?.banks ?? [],
    updateSettings: updateMutation.mutate,
    updateSettingsAsync: updateMutation.mutateAsync,
    isUpdatingSettings: updateMutation.isPending,
    updateSettingsError: updateMutation.error
  };
}

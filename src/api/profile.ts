import { BaseURL, store_name } from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const fetchRealtorSettingsInfo = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/settings/?store_name=${storeName}`
  );
};

export const updateRealtorSettings = async (body: any) => {
  //you can properly type this instead of using "any"

  const storeName = store_name();

  return await agent_auth_fetch.patch(
    `${BaseURL}/agents/settings/?store_name=${storeName}`,
    {...body,profile_update: true}
  );
};

export const fetchRealtorNotifications = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/notify_agent/?store_name=${storeName}`
  );
};

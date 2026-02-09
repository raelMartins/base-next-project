import { BaseURL, store_name } from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const fetchReferrals = async (params: string) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/customers/?store_name=${storeName}&${params}`
  );
};

export const fetchReferralInfo = async (id: string) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/customers/${id}/?store_name=${storeName}`
  );
};

import { BaseURL, store_name } from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const fetchStoreDetails = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/store/store_info/?store_name=${storeName}`
  );
};

export const realtorLogin = async (data: {
  email: string;
  store_name: string;
}) => {
  return await agent_auth_fetch.post(`${BaseURL}/store/agent-webstore`, data);
};

export const verifyRealtorToken = async (data: { token: string }) => {
  return await agent_auth_fetch.post(
    `${BaseURL}/store/verify-agent-token`,
    data
  );
};

export const fetchAccountInfo = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/account?store_name=${storeName}`
  );
};

export const submitAgentApplication = async (data: Record<string, unknown>) => {
  return await agent_auth_fetch.post(`${BaseURL}/user/agent`, data);
};

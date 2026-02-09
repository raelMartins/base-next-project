import { BaseURL } from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const fetchAgentRequest = async (param: string) => {
  return await agent_auth_fetch.get(`${BaseURL}/agents/requests${param}`);
};

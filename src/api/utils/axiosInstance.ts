import axios from 'axios';
import { getSession } from './sessionmanagers';
import { BaseURL } from '@/constants/routes';
import { REALTOR_SESSION_KEY, TOKEN_SESSION_KEY } from '@/constants';

export const agent_auth_fetch = axios.create({
  baseURL: BaseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30 * 60 * 1000
});

agent_auth_fetch.interceptors.request.use(
  async (config) => {
    const token = await getSession(TOKEN_SESSION_KEY);
    const agentInfo: any = await getSession(REALTOR_SESSION_KEY);
    const storeName = agentInfo?.storeName;
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    if (storeName) config.headers['store-name'] = storeName;
    return config;
  },
  (error) => Promise.reject(error)
);

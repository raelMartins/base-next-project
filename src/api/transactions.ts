import { BaseURL, store_name } from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const accountTransactions = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/transactions?store_name=${storeName}`
  );
};

export const fetchSettlementAccounts = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/withdrawals/?accounts=true&store_name=${storeName}`
  );
};

export const fetchRecentCommissions = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/commission-request/${storeName}/`
  );
};

export const fetchBanks = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/settings/?store_name=${storeName}&bank=true`
  );
};

export const fetchAutopayBreakdown = async (
  equity_id: string,
  user_id: string
) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/equity_breakdown/${equity_id}/?user=${user_id}&store_name=${storeName}`
  );
};

export const fetchUpcomingPayments = async (
  equity_id: string,
  user_id: string
) => {
  return await agent_auth_fetch.get(
    `${BaseURL?.replace(`v2`, 'v1')}/transaction/agent_upcoming?user=${user_id}&equity=${equity_id}`
  );
};

export const fetchPastPayments = async (equity_id: string) => {
  return await agent_auth_fetch.post(
    `${BaseURL?.replace(`v2`, 'v1')}/transaction/equity/${parseInt(equity_id)}/`,
    {}
  );
};

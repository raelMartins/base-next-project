import {
  BaseURL,
  BaseURLONE,
  business_id,
  store_name
} from '../constants/routes';
import { agent_auth_fetch } from './utils/axiosInstance';

export const fetchListings = async (param?: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/store/agent_dashboard${param ? param : ``}`
  );
};

export const fetchSingleListing = async (param: string) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURLONE}/investment/project/${param}?store_name=${storeName}`
  );
};
export const fetchListingBundles = async (params: string) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/investment/project-bundles/${params}`
  );
};

export const getAllContactPersons = async (projectId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/developers/contact-persons?project=${projectId}`
  );
};
export const getSubscribers = async (params: string) => {
  return await agent_auth_fetch.get(`${BaseURL}/agents/subscribers/${params}`);
};

export const fetchPropertytDocument = async (
  id: string,
  purpose: 'brochure' | 'paymentplan' | 'outright'
) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/developers/project-documents?project_id=${id}&purpose=${purpose}`
  );
};
export const fetchCustomPlanSummary = async (planId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/investment/custom-plan-payments/${planId}/`
  );
};

export const fetchPropertyUnits = async (projectId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/investment/project-bundles/?project_id=${parseInt(projectId)}`
  );
};

export const fetchPaymentPlansForUnit = async (bundleId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/investment/bundle-paymentplans/?bundle_id=${bundleId}`
  );
};

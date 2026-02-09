export interface ProfileApprovedBy {
  customer_info: null | unknown;
  id: number;
  username: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone: string;
  avatar: string;
  email: string;
  sign_up_time: string;
  gender: string | null;
  country: string;
  initial_status: string;
  status: boolean;
}

export interface ProfileUser {
  id: number;
  phone: string;
  approved_by: ProfileApprovedBy | null;
  status: boolean;
  country: string;
  active: boolean;
  blacklisted: boolean;
  refunded_balance: string;
  initial_status: string;
  is_tier3: boolean;
  default_timezone: string | null;
  gender: string | null;
  created_at: string;
  avatar: string | null;
  password: string | null;
  highest_education: string | null;
  address: string | null;
  employment_status: string | null;
  monthly_income: string | null;
  yearly_income: string | null;
  occupation: string | null;
  marital_status: string | null;
  company_name: string | null;
  company_address: string | null;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  year_of_birth: number | null;
  bvn: string | null;
  date_of_birth: string | null;
  biometric_authentication: boolean;
  is_blocked: boolean;
  push_notification_allowed: boolean;
  mfa_secret: string | null;
  is_mfa: boolean;
  approved_at: string | null;
  rejection_reason: string | null;
  agent_id: string;
  sign_up_time: string;
  user: number;
  business: number;
}

export interface VerificationDoc {
  id: number;
  document: string;
  store: string;
  document_type: string | null;
  created_at: string;
  user: number;
  extended_user: number | null;
}

export interface ProfileVerification {
  details: unknown | null;
  docs: VerificationDoc[];
}

export interface ProfileBank {
  id?: number;
  account_number?: string;
  bank_name?: string;
  bank?: string;
  created_at?: string;
  date_added?: string;
}

export interface ProfileSettingsResponse {
  user: ProfileUser;
  verification: ProfileVerification;
  banks: ProfileBank[];
}

/** Normalize API response - supports both { message: {...} } and direct {...} shapes */
export function getProfilePayload(data: unknown): ProfileSettingsResponse | null {
  const msg = (data as { message?: ProfileSettingsResponse })?.message;
  const direct = data as ProfileSettingsResponse;
  const payload = msg ?? direct;
  return payload?.user ? payload : null;
}

export const REALTOR_PORTAL_ROUTE = `/realtor_portal`;
const ENV_PREFIX =
  process.env.NEXT_PUBLIC_SERVER_ENV === 'development'
    ? 'dev'
    : process.env.NEXT_PUBLIC_SERVER_ENV === 'staging'
      ? 'staging'
      : process.env.NEXT_PUBLIC_SERVER_ENV === 'production'
        ? 'api'
        : 'dev';
export const BaseURL = `https://${ENV_PREFIX}.matadortrust.com/v2`;
export const BaseURLONE = `https://${ENV_PREFIX}.matadortrust.com/v1`;
export const appWindow = typeof window !== 'undefined' ? window : null;

const STORE_NAME_KEY = 'storeName';
const DEFAULT_STORE_NAME = 'malikproperties-dev';

/**
 * Extracts store name from hostname when URL matches pattern:
 * realtors.{storeName}.{rest} (e.g. realtors.malikproperties-dev.6787878.com)
 */
const getStoreNameFromUrl = (): string | null => {
  if (!appWindow?.location?.hostname) return null;
  const parts = appWindow.location.hostname.split('.');
  if (parts.length >= 3 && parts[0] === 'realtors' && parts[1]) {
    return parts[1];
  }
  return null;
};

export const store_name = (): string => {
  return DEFAULT_STORE_NAME;
  if (!appWindow) return DEFAULT_STORE_NAME;

  const fromUrl = getStoreNameFromUrl();
  if (fromUrl) {
    try {
      localStorage?.setItem(STORE_NAME_KEY, JSON.stringify(fromUrl));
    } catch {
      // ignore storage errors
    }
    return fromUrl;
  }

  try {
    const stored = localStorage?.getItem(STORE_NAME_KEY);
    if (stored) return JSON.parse(stored) as string;
  } catch {
    // ignore parse errors
  }
  return DEFAULT_STORE_NAME;
};
export const business_id = () =>
  (appWindow &&
    localStorage &&
    JSON?.parse(localStorage?.getItem('business_id') as string)) ||
  '';

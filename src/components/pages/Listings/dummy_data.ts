/** Listing shape from the backend (agent_dashboard / store listings). Consumed as-is by the UI. */
export type ListingType = {
  id: number;
  name?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  starting_from?: number;
  units_available?: number;
  payment_plan_is_available?: boolean;
  photo_urls?: string[];
  photos?: { photo: string }[];
  external_commission_rate?: string;
  internal_commission_rate?: string;
  display_price?: boolean;
  [key: string]: unknown;
};

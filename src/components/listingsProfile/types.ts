type amenityInstance = { name: string; icon: { src: string } };
export interface listingDetailsProps {
  building_type: string;
  id: string;
  unit_id: string;
  starting_from: string;
  land_title: string;
  land_size: string;
  photo_urls: any;
  name: string;
  address: string;
  external_commission_rate: string;
  end_period: string;
  end_year: string;
  start_period: string;
  start_year: string;
  landmark: string;
  purchase_url: string;
  description: string;
  amenities: amenityInstance[];
  longitude: number;
  latitude: number;
  payment_plan_is_available: boolean;
  units_available?: number;
}

export interface contactPersonProps {
  name: string;
  image: string;
  phone_number: string;
}

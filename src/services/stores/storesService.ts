import {Store, translateStoresResponse} from './storesTranslators';

export interface StoreResponse {
  id: string;
  name: string;
  address: Address;
  tasks: Task[];
  open: boolean;
  schedule: Schedule;
  shipping_methods: ShippingMethod[];
}

export interface Address {
  direction: string;
  coordinate: Coordinate;
}

export interface Coordinate {
  lat: string;
  lng: string;
}

export interface Schedule {
  from: string;
  end: string;
  timezone: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  description: string;
  assigned: boolean;
}
export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await fetch(
      'https://ikp-mobile-challenge-backend.up.railway.app/stores',
    );
    const resJson = await response.json();
    const processedResponse = translateStoresResponse(resJson);
    return processedResponse;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

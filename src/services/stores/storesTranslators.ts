import {Schedule, ShippingMethod, StoreResponse, Task} from './storesService';

export interface Store {
  id: string;
  name: string;
  address: TranslatedAddress;
  tasks: Task[];
  open: boolean;
  schedule: Schedule;
  shipping_methods: ShippingMethod[];
  image: string;
}

export interface TranslatedAddress {
  direction: string;
  coordinate: TranslatedCoordinate;
}

export interface TranslatedCoordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const translateStoresResponse = (response: StoreResponse[]): Store[] => {
  return response.map((storedStore: StoreResponse) => {
    return {
      ...storedStore,
      image:
        'https://checkpointsystems.com/es/wp-content/uploads/sites/26/21-09-30-tiendanimal-002-pequeno.jpg',
      address: {
        ...storedStore.address,
        coordinate: {
          latitude: parseFloat(storedStore.address.coordinate.lat),
          longitude: parseFloat(storedStore.address.coordinate.lng),
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
      },
    };
  });
};

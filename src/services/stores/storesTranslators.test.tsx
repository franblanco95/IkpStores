import {translateStoresResponse} from './storesTranslators';

describe('translateStoresResponse Function', () => {
  it('translates api response correctly', () => {
    const mockResponse = [
      {
        id: '1',
        name: 'Store 1',
        address: {
          direction: '123 Main St',
          coordinate: {lat: '123.456', lng: '789.012'},
        },
        tasks: [],
        open: true,
        schedule: {from: '09:00 AM', end: '06:00 PM', timezone: 'UTC'},
        shipping_methods: [{id: '1', name: 'Method 1', description: 'Desc 1'}],
      },
    ];

    const result = translateStoresResponse(mockResponse);

    expect(result).toEqual([
      {
        id: '1',
        name: 'Store 1',
        address: {
          direction: '123 Main St',
          coordinate: {
            latitude: 123.456,
            longitude: 789.012,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
        },
        tasks: [],
        open: true,
        schedule: {from: '09:00 AM', end: '06:00 PM', timezone: 'UTC'},
        shipping_methods: [{id: '1', name: 'Method 1', description: 'Desc 1'}],
        image:
          'https://checkpointsystems.com/es/wp-content/uploads/sites/26/21-09-30-tiendanimal-002-pequeno.jpg',
      },
    ]);
  });
});

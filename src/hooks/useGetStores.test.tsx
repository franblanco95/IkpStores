import React from 'react';
import {useGetStores} from './useGetStores';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';
import {waitFor} from '@testing-library/react-native';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        retry: true,
      },
    },
  });

  return ({children}: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGetStores Hook', () => {
  it('Fetch data succesfully', async () => {
    const {result} = renderHook(() => useGetStores(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});

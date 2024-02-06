import React from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigation />
    </QueryClientProvider>
  );
}

export default App;

import {useQuery} from '@tanstack/react-query';
import {getStores} from '../services/stores/storesService';

export const useGetStores = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores(),
  });
  return {isLoading, data};
};

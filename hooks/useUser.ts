import useSWR from 'swr';
import { fetcher } from '@/lib/swrFetchers';
import { Record, Admin } from 'pocketbase';

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<Record | Admin | null>('/api/user', fetcher);

  return {
    user: data,
    isLoading,
    error,
    mutate,
    isLogged: data?.roles?.includes('ROLE_USER') ?? false,
    isAdmin: data?.roles?.includes('ROLE_ADMIN') ?? false,
  };
};

export default useUser;

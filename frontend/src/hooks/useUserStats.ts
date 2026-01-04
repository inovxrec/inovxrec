import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';

export const useUserStats = () => {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: ['userStats'],
        queryFn: async () => {
            const { data } = await api.get('/auth/stats/');
            return data;
        },
        enabled: isAuthenticated,
    });
};

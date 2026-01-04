import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Problem } from '@/types'; // Ensure this matches or extend it

// Define the API response types if different from frontend types
interface ProblemListResponse {
    id: number;
    title: string;
    slug: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    solved: boolean;
}

interface ProblemDetailResponse extends ProblemListResponse {
    description: string;
    examples: any[];
    constraints: string[];
    starter_code: Record<string, string>;
    created_at: string;
}

interface ProblemStatsResponse {
    total: number;
    easy: number;
    medium: number;
    hard: number;
    solved: number;
    solved_easy: number;
    solved_medium: number;
    solved_hard: number;
}

export const useProblems = () => {
    return useQuery({
        queryKey: ['problems'],
        queryFn: async () => {
            // NOTE: fetching all might be paginated. For now assuming page size covers it or we map results?
            // Since backend has pagination, this might return { count, next, previous, results: [] }
            // We should handle that.
            const { data } = await api.get('/problems/');
            if (data.results) {
                return data.results as ProblemListResponse[];
            }
            return data as ProblemListResponse[]; // Fallback if pagination disabled
        },
    });
};

export const useProblem = (slug: string) => {
    return useQuery({
        queryKey: ['problem', slug],
        queryFn: async () => {
            const { data } = await api.get<ProblemDetailResponse>(`/problems/${slug}/`);
            // Map backend snake_case to frontend camelCase
            return {
                ...data,
                starterCode: data.starter_code,
                id: data.id.toString(), // Frontend expects string ID usually
            };
        },
        enabled: !!slug,
    });
};

export const useProblemTags = () => {
    return useQuery({
        queryKey: ['problemTags'],
        queryFn: async () => {
            const { data } = await api.get<{ id: number, name: string }[]>('/problems/tags/');
            return data.map(t => t.name);
        }
    });
};

export const useProblemStats = () => {
    return useQuery({
        queryKey: ['problemStats'],
        queryFn: async () => {
            const { data } = await api.get<ProblemStatsResponse>('/problems/stats/');
            return data;
        }
    });
};

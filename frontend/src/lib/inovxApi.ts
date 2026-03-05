import api from './axios';

// Project Types
export interface IProject {
    _id: string;
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    github?: string;
    demo?: string;
    color: string;
}

// Event Types
export interface IEvent {
    _id: string;
    date: string;
    title: string;
    description: string;
    location: string;
    category: string;
    image: string;
    icon: string;
    color: string;
    isLive?: boolean;
    liveLink?: string;
}

// Team Types
export interface ITeamMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
    order: number;
}

// Stats Types
export interface IStatistic {
    _id: string;
    label: string;
    value: number;
    suffix: string;
    order: number;
}

// Enquiry Type
export interface IEnquiry {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const inovxApi = {
    // Projects
    getProjects: async () => {
        const response = await api.get<IProject[]>('/projects');
        return response.data;
    },
    createProject: async (data: FormData) => {
        const response = await api.post<IProject>('/projects', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    updateProject: async (id: string, data: FormData) => {
        const response = await api.put<IProject>(`/projects/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    deleteProject: async (id: string) => {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },

    // Events
    getEvents: async () => {
        const response = await api.get<IEvent[]>('/events');
        return response.data;
    },
    createEvent: async (data: FormData) => {
        const response = await api.post<IEvent>('/events', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    updateEvent: async (id: string, data: FormData | Partial<IEvent>) => {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        const response = await api.put<IEvent>(`/events/${id}`, data, { headers });
        return response.data;
    },
    deleteEvent: async (id: string) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    },

    getLiveEvent: async () => {
        const response = await api.get<IEvent>('/events/live');
        return response.data;
    },

    // Team
    getTeam: async () => {
        const response = await api.get<ITeamMember[]>('/team');
        return response.data;
    },
    createTeamMember: async (data: FormData) => {
        const response = await api.post<ITeamMember>('/team', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    updateTeamMember: async (id: string, data: FormData) => {
        const response = await api.put<ITeamMember>(`/team/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    deleteTeamMember: async (id: string) => {
        const response = await api.delete(`/team/${id}`);
        return response.data;
    },

    // Statistics
    getStatistics: async () => {
        const response = await api.get<IStatistic[]>('/statistics');
        return response.data;
    },
    createStatistic: async (data: Partial<IStatistic>) => {
        const response = await api.post<IStatistic>('/statistics', data);
        return response.data;
    },
    updateStatistic: async (id: string, data: Partial<IStatistic>) => {
        const response = await api.put<IStatistic>(`/statistics/${id}`, data);
        return response.data;
    },
    deleteStatistic: async (id: string) => {
        const response = await api.delete(`/statistics/${id}`);
        return response.data;
    },

    // Enquiries (Contact Form)
    getEnquiries: async () => {
        const response = await api.get('/enquiries');
        return response.data;
    },
    sendEnquiry: async (data: IEnquiry) => {
        const response = await api.post('/enquiries', data);
        return response.data;
    }
};

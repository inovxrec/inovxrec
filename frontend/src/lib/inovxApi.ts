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

    // Events
    getEvents: async () => {
        const response = await api.get<IEvent[]>('/events');
        return response.data;
    },

    // Team
    getTeam: async () => {
        const response = await api.get<ITeamMember[]>('/team');
        return response.data;
    },

    // Statistics
    getStatistics: async () => {
        const response = await api.get<IStatistic[]>('/statistics');
        return response.data;
    },

    // Enquiries (Contact Form)
    sendEnquiry: async (data: IEnquiry) => {
        const response = await api.post('/enquiries', data);
        return response.data;
    }
};

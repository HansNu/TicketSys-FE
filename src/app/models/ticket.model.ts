export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketRequest {
    title: string;
    description: string;
    priority: string;
}

export interface UpdateTicketRequest {
    title: string;
    description: string;
    priority: string;
}

export interface UpdateTicketStatusRequest {
    status: string;
}
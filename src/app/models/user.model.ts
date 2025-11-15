export interface User {
    id: number;
    email: string;
    role: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
    expiresAt: string;
}
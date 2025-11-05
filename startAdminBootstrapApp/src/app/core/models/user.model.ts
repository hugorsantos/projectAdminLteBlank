export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: Omit<User, 'status' | 'createdAt'> & { status?: UserStatus };
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
}

export interface UserFilters {
    q?: string;
    page?: number;
    pageSize?: number;
    sortBy?: keyof User;
    sortDir?: 'asc' | 'desc';
}
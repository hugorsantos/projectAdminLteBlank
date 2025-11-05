import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, PaginatedResponse, UserFilters } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private readonly API_URL = '/api/users';

    constructor(private http: HttpClient) {}

    getUsers(filters?: UserFilters): Observable<PaginatedResponse<User>> {
        let params = new HttpParams();

        if (filters) {
            if (filters.q) {
                params = params.set('q', filters.q);
            }
            if (filters.page !== undefined) {
                params = params.set('page', filters.page.toString());
            }
            if (filters.pageSize !== undefined) {
                params = params.set('pageSize', filters.pageSize.toString());
            }
            if (filters.sortBy) {
                params = params.set('sortBy', filters.sortBy);
            }
            if (filters.sortDir) {
                params = params.set('sortDir', filters.sortDir);
            }
        }

        return this.http.get<PaginatedResponse<User>>(this.API_URL, { params });
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/${id}`);
    }

    createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
        return this.http.post<User>(this.API_URL, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.API_URL}/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
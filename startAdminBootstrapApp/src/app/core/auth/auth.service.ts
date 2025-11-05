import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API_URL = '/api/auth';
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'auth_user';

    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(response => {
                if (response.token && response.user) {
                    this.setSession(response);
                }
            })
        );
    }

    logout(): void {
        StorageUtil.remove(this.TOKEN_KEY);
        StorageUtil.remove(this.USER_KEY);
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): string | null {
        return StorageUtil.get(this.TOKEN_KEY);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    private setSession(authResult: LoginResponse): void {
        StorageUtil.set(this.TOKEN_KEY, authResult.token);
        StorageUtil.set(this.USER_KEY, JSON.stringify(authResult.user));
        this.currentUserSubject.next(authResult.user as User);
        this.isAuthenticatedSubject.next(true);
    }

    private getUserFromStorage(): User | null {
        const userJson = StorageUtil.get(this.USER_KEY);
        if (!userJson) {
            return null;
        }
        try {
            return JSON.parse(userJson);
        } catch {
            return null;
        }
    }

    private hasToken(): boolean {
        return !!this.getToken();
    }
}
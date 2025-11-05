import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const mockLoginRequest: LoginRequest = {
        email: 'admin@demo.com',
        password: '123456',
    };

    const mockLoginResponse: LoginResponse = {
        token: 'mock-jwt-token',
        user: {
            id: 1,
            name: 'Admin User',
            email: 'admin@demo.com',
            role: 'admin',
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        localStorage.clear();
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login successfully and store token', done => {
        service.login(mockLoginRequest).subscribe(response => {
            expect(response).toEqual(mockLoginResponse);
            expect(service.getToken()).toBe('mock-jwt-token');
            expect(service.isAuthenticated()).toBe(true);
            done();
        });

        const req = httpMock.expectOne('/api/auth/login');
        expect(req.request.method).toBe('POST');
        req.flush(mockLoginResponse);
    });

    it('should logout and clear storage', () => {
        StorageUtil.set('auth_token', 'some-token');
        StorageUtil.set('auth_user', JSON.stringify(mockLoginResponse.user));

        service.logout();

        expect(service.getToken()).toBeNull();
        expect(service.getCurrentUser()).toBeNull();
        expect(service.isAuthenticated()).toBe(false);
    });

    it('should return null when no token exists', () => {
        expect(service.getToken()).toBeNull();
    });

    it('should emit currentUser$ on login', done => {
        service.currentUser$.subscribe(user => {
            if (user) {
                expect(user.email).toBe('admin@demo.com');
                done();
            }
        });

        service.login(mockLoginRequest).subscribe();

        const req = httpMock.expectOne('/api/auth/login');
        req.flush(mockLoginResponse);
    });
});
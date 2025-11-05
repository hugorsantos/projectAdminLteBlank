import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User, PaginatedResponse } from '../models/user.model';

describe('UsersService', () => {
    let service: UsersService;
    let httpMock: HttpTestingController;

    const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-01-01T00:00:00.000Z',
    };

    const mockPaginatedResponse: PaginatedResponse<User> = {
        data: [mockUser],
        page: 1,
        pageSize: 10,
        total: 1,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsersService],
        });
        service = TestBed.inject(UsersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get users with filters', done => {
        const filters = { q: 'John', page: 1, pageSize: 10 };

        service.getUsers(filters).subscribe(response => {
            expect(response).toEqual(mockPaginatedResponse);
            done();
        });

        const req = httpMock.expectOne(
            req => req.url === '/api/users' && req.params.has('q') && req.params.get('q') === 'John'
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockPaginatedResponse);
    });

    it('should get user by id', done => {
        service.getUserById(1).subscribe(user => {
            expect(user).toEqual(mockUser);
            done();
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });

    it('should create user', done => {
        const newUser = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: 'user' as const,
            status: 'active' as const,
        };

        service.createUser(newUser).subscribe(user => {
            expect(user.name).toBe('Jane Doe');
            done();
        });

        const req = httpMock.expectOne('/api/users');
        expect(req.request.method).toBe('POST');
        req.flush({ ...newUser, id: 2, createdAt: new Date().toISOString() });
    });

    it('should update user', done => {
        const updates = { name: 'John Updated' };

        service.updateUser(1, updates).subscribe(user => {
            expect(user.name).toBe('John Updated');
            done();
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('PUT');
        req.flush({ ...mockUser, ...updates });
    });

    it('should delete user', done => {
        service.deleteUser(1).subscribe(() => {
            expect(true).toBe(true);
            done();
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
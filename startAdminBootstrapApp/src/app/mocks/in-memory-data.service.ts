import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-ap    i';
import { User } from '../core/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users: User[] = this.generateMockUsers();
        return { users };
    }

    // Sobrescrever método para simular login
    post(reqInfo: RequestInfo) {
        if (reqInfo.collectionName === 'auth' && reqInfo.url.endsWith('/login')) {
            return this.handleLogin(reqInfo);
        }
        return undefined;
    }

    // Sobrescrever método GET para adicionar paginação e filtros
    get(reqInfo: RequestInfo) {
        if (reqInfo.collectionName === 'users') {
            return this.handleGetUsers(reqInfo);
        }
        return undefined;
    }

    private handleLogin(reqInfo: RequestInfo) {
        const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req);

        // Credenciais mock válidas
        const validCredentials = [
            { email: 'admin@demo.com', password: '123456', role: 'admin' },
            { email: 'user@demo.com', password: '123456', role: 'user' },
        ];

        const validUser = validCredentials.find(
            cred => cred.email === email && cred.password === password
        );

        if (validUser) {
            const response = {
                token: `mock-jwt-token-${Date.now()}`,
                user: {
                    id: validUser.role === 'admin' ? 1 : 2,
                    name: validUser.role === 'admin' ? 'Admin User' : 'Regular User',
                    email: validUser.email,
                    role: validUser.role,
                    status: 'active',
                },
            };
            return reqInfo.utils.createResponse$(() => ({
                status: 200,
                body: response,
            }));
        }

        return reqInfo.utils.createResponse$(() => ({
            status: 401,
            body: { error: 'Invalid credentials' },
        }));
    }

    private handleGetUsers(reqInfo: RequestInfo) {
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const allUsers = reqInfo.collection as User[];

        // Extrair query params
        const params = reqInfo.query;

        // Filtrar por busca
        let filteredUsers = allUsers;
        if (q) {
            filteredUsers = allUsers.filter(
                user =>
                    user.status.toLowerCase().includes(q)
            );
        }

        // Ordenar
        filteredUsers.sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (aVal < bVal) {
                return sortDir === 'asc' ? -1 : 1;
            }
            if (aVal > bVal) {
                return sortDir === 'asc' ? 1 : -1;
            }
            return 0;
        });

        // Paginar
        const total = filteredUsers.length;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        const response = {
            data: paginatedUsers,
            page,
            pageSize,
            total,
        };

        return reqInfo.utils.createResponse$(() => ({
            status: 200,
            body: dataEncapsulation ? { data: response } : response,
        }));
    }

    private generateMockUsers(): User[] {
        const firstNames = [
            'João',
            'Maria',
            'Pedro',
            'Ana',
            'Carlos',
            'Juliana',
            'Fernando',
            'Patricia',
            'Ricardo',
            'Camila',
            'Lucas',
            'Beatriz',
            'Rafael',
            'Fernanda',
            'Gustavo',
            'Amanda',
            'Bruno',
            'Larissa',
            'Thiago',
            'Mariana',
            'Diego',
            'Isabela',
            'Rodrigo',
            'Gabriela',
            'Felipe',
        ];
        const lastNames = [
            'Silva',
            'Santos',
            'Oliveira',
            'Souza',
            'Rodrigues',
            'Ferreira',
            'Alves',
            'Pereira',
            'Lima',
            'Gomes',
            'Costa',
            'Ribeiro',
            'Martins',
            'Carvalho',
            'Rocha',
        ];
        const roles: Array<'admin' | 'user'> = ['admin', 'user'];
        const statuses: Array<'active' | 'inactive'> = ['active', 'inactive'];

        return Array.from({ length: 30 }, (_, i) => {
            const firstName = firstNames[i % firstNames.length];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@demo.com`;
            const role = i < 5 ? 'admin' : roles[Math.floor(Math.random() * roles.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const daysAgo = Math.floor(Math.random() * 365);
            const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

            return {
                id: i + 1,
                name,
                email,
                role,
                status,
                createdAt,
            };
        });
    }
}
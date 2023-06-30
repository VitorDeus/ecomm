import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import app from '../../app';

beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET on /categories', () => {
    it('deve retornar todas as categorias', async () => {
        const response = await request('http://localhost:3000').get('/categories');
        expect(response.status).toBe(200);

        response.body.forEach((category) => {
            expect(category).toHaveProperty('_id');
            expect(category).toHaveProperty('name');
            expect(category).toHaveProperty('status');
        });
    });

    it('deve retornar uma categoria, por ID', async () => {
        const response = await request('http://localhost:3000').get('/categories');
        const { _id, name, status} = response.body[0];
        const responseId = await request('http://localhost:3000').get(`/categories/${_id}`);
        expect(responseId.status).toBe(200);
        expect(responseId.body).toHaveProperty('_id');
        expect(responseId.body.name).toBe(name);
        expect(responseId.body.status).toBe(status);
    });
});

describe('POST em /categories', () => {
    it('Deve criar uma categoria', async () => {
        const category = {
            name: 'Test',
            status: 'ATIVA',
        };
        const response = await request('http://localhost:3000').post('/categories').send(category);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(category.name);
        expect(response.body.status).toBe(category.status);
    });

    it('Deve retornar erro 500, quando o body é inválido', async () => {
        const category = {
            name: '',
            status: 'ATIVA',
        };
        const response = await request('http://localhost:3000').post('/categories').send(category);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
    });
});

describe('DELETE em /categories', () => {
    it('Deve deletar uma categoria, por ID', async () => {
        const response = await request('http://localhost:3000').get('categories');
        const { _id } = response.body[0];
        const responseId = await request('http://localhost:3000').delete(`/categorires/${_id}`);
        expect(responseId.status).toBe(200);
        expect(responseId.body).toHaveProperty('message');
    });
});
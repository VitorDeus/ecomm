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

describe('GET on /products', () => {
    it('deve retornar todos os produtos', async () => {
        const response = await request('http://localhost:3000').get('/products');
        expect(response.status).toBe(200);

        response.body.forEach((product) => {
            expect(product).toHaveProperty('_id');
            expect(product).toHaveProperty('nome');
            expect(product).toHaveProperty('status');
            expect(product).toHaveProperty('slug');
            expect(product).toHaveProperty('preco');
            expect(product).toHaveProperty('estoque');
        });
    });

    it('deve retornar um produto, por ID', async () => {
        const response = await request('http://localhost:3000').get('/products');
        const { _id, nome, status, slug, preco, estoque} = response.body[0];
        const responseId = await request('http://localhost:3000').get(`/products/${_id}`);
        expect(responseId.status).toBe(200);
        expect(responseId.body).toHaveProperty('_id');
        expect(responseId.body.nome).toBe(nome);
        expect(responseId.body.status).toBe(status);
        expect(responseId.body.slug).toBe(slug);
        expect(responseId.body.preco).toBe(preco);
        expect(responseId.body.estoque).toBe(estoque);
    });
});

describe('POST em /products', () => {
    it('Deve criar um produto', async () => {
        const product = {
            nome: 'Playstation 5',
            descricao: 'Console de última geração',
            slug: 'ij3439ud09',
            preco: 2999.00,
            estoque: 50,
        };
        const response = await request('http://localhost:3000').post('/products').send(product);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.nome).toBe(product.nome);
        expect(response.body.descricao).toBe(product.descricao);
        expect(response.body.slug).toBe(product.slug);
        expect(response.body.preco).toBe(product.preco);
        expect(response.body.estoque).toBe(product.estoque);
    });

    it('Deve retornar erro 500, quando o body é inválido', async () => {
        const product = {
            nome: '',
            descricao: 'Mistery Box',
            slug: 'aneajweawj92',
            preco: 499.99,
            estoque: 100,
        };
        const response = await request('http://localhost:3000').post('/products').send(product);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
    });
});

describe('DELETE em /products', () => {
    it('Deve deletar um produto, por ID', async () => {
        const response = await request('http://localhost:3000').get('products');
        const { _id } = response.body[0];
        const responseId = await request('http://localhost:3000').delete(`/products/${_id}`);
        expect(responseId.status).toBe(200);
        expect(responseId.body).toHaveProperty('message');
    });
});
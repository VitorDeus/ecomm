import express from 'express';
import { ProductsController } from '../controllers/productsController';

const router = express.Router;

export const productRouter = router
    .get('/products', ProductsController.listProducts)
    .get('/products/:id', ProductsController.listProductById)
    .post('/products', ProductsController.createProduct)
    .put('/products/:id', ProductsController.updateProductById)
    .delete('/products/:id', ProductsController.deleteProductById)
import express from 'express';
import { CategoryController } from '../controllers/categoriesController';

const router = express.Router();

export const categoryRouter = router
    .get("/getcategories", CategoryController.listCategories)
    .get("/getcategories/:id", CategoryController.listCategorieById)
    .post("/getcategories", CategoryController.createCategory)
    .put("/getcategories/:id", CategoryController.updateCategory)
    .patch("/getcategories/activate/:id", CategoryController.updateCategoryStatus)
    .delete("/getcategories/:id", CategoryController.deleteCategory)


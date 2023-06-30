import { categories } from "../models/Category";
import { products } from "../models/Product";

export class ProductsController {
    static listProducts = async (req, res) => {
        try{
            const response = await products.find().populate('categoria', 'name');
            return res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static createProduct = async (req, res) => {
        try{
            const data = req.body;
            const categoryId = req.body.categoria;

            if (categoryId) {
                const category = await categories.findById(categoryId);
                if (!category) {
                    return res.status(404).json({message: "Category not found!"})
                };
            };

            const product = await products.create(data);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static listProductById = async (req, res) => {
        try{
            const { id } = req.params;
            const product = await products.findById(id).populate('categoria', 'name');
            return product ? res.status(200).json(product) : res.status(404).json({message: "Product not found"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static updateProductById = async (req, res) => {
        try{
            const { id } = req.params;
            const data = req.body;
            const product = await products.findByIdAndUpdate(id, data, {new: true});
            return product ? res.status(200).json(product) : res.status(404).json({message: "Product not found"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static deleteProductById = async (req, res) => {
        try{
            const { id } = req.params;
            const product = await products.findByIdAndDelete(id);
            return product ? res.status(204).send() : res.status(404).json({message: "Product not found"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
};
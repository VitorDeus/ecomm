import categories from '../models/Category.js'

export class CategoryController {
    static listCategories = async (req, res) => {
        try {
            const allCategories = await categories.find();
            res.status(200).json(allCategories);
        }
        catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static listCategorieById = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categories.findById(id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({message: "Category not found"});
            }
        }catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static createCategory = async (req, res) => {
        try {
            const { body } = req;
            const newCategory = await categories.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    };
};
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
            return category ? res.status(200).json(category) : res.status(404).json({message: "Category not found!"})
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

    static updateCategory = async (req, res) => {
        try{
            const { id } = req.params;
            const data = req.body;
            const categoryUpdated = await categories.findByIdAndUpdate(id, data, {new:true});
            return categoryUpdated ? res.status(200).json(categoryUpdated) : res.status(404).json({message:"Category not found!"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static deleteCategory = async (req, res) => {
        try{
            const { id } = req.params;
            const categoryDeleted = await categories.findByIdAndDelete(id);
            return categoryDeleted ? res.status(204).send() : res.status(404).json({message:"Category not found!"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static updateCategoryStatus = async (req, res) => {
        try{
            const { id } = req.params;
            const category = await categories.findById(id);

            if (!category) {
                return res.status(404).json({message: "Category not found!"});
            }

            if(category.status == "ATIVA") {
                return res.status(400).json({message: "Category is already activated"});
            } 

            const activatedCategory = await categories.findByIdAndUpdate(id, {status: 'ATIVA'}, {new: true});
            res.status(200).json(activatedCategory)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
};
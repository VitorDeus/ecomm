import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
    {
        id: {type: mongoose.Types.ObjectId},
        nome: {type: String, minLength: 4, match: /^[^0-9].*$/, required: true,},
        descricao: {type: String, minLength: 10, required: true,},
        slug: {type: String, minLength: 5, match: /^[a-zA-Z0-9-]+$/, required: true,},
        preco: {type: mongoose.Types.Decimal128, min: 0.01, required: true,},
        estoque: {type: Number, minLength: 4, match: /^[^0-9].*$/, required: true,},
        categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true,},
    },
);

export const products = mongoose.model("products", productsSchema);
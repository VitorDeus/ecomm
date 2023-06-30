import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
    {
        id: {type:mongoose.Types.ObjectId},
        name: {type: String, minlength: 3, required: true, match: /^[^0-9].*$/},
        status: {type: String, enum: ['ATIVA', 'INATIVA'], default: 'ATIVA'},
    }
);

export const categories = mongoose.model('categories', categoriesSchema);
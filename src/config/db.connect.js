import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:secret@localhost:27017/ecomm?authSource=admin');

export const db = mongoose.connection;
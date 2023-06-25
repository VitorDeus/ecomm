import express from 'express';
import { categoryRouter } from './categories.routes';

export const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({titulo: 'Rota Ok'});
    });

    app.use(express.json(), categoryRouter);
};
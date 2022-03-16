"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middlewae/verifyAuthToken"));
const store = new product_1.productStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const products = await store.show(id);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: parseInt(req.body.id),
            productName: req.body.productName,
            price: parseInt(req.body.price),
            category: req.body.category,
        };
        if (product.productName === '') {
            res.status(400).send('product name is required');
        }
        else if (product.price <= 0) {
            res.status(400).send('invalid price');
        }
        else if (!product.price) {
            res.status(400).send('price is required');
        }
        else {
            const newProduct = await store.create(product);
            res.json(newProduct);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const deleted = await store.delete(id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/show', show);
    app.post('/product', verifyAuthToken_1.default, create);
    app.delete('/product', verifyAuthToken_1.default, destroy);
};
exports.default = productRoutes;

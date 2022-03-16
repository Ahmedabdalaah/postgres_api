"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line prettier/prettier
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middlewae/verifyAuthToken"));
const store = new order_1.orderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        // eslint-disable-next-line prettier/prettier
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const orders = await store.show(id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            order_id: parseInt(req.body.order_id),
            user_id: parseInt(req.body.user_id),
            order_status: req.body.order_status,
        };
        if (order.order_status === '') {
            res.status(400).send('order_status is required');
        }
        else if (order.order_status != 'complete' && order.order_status != 'active') {
            res.status(400).send('order_status should be complete or active');
        }
        else {
            const newOrder = await store.create(order);
            res.json(newOrder);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const order_id = parseInt(req.body.order_id);
        const deleted = await store.delete(order_id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const order_id = parseInt(req.body.order_id);
        const product_id = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const order = await store.addProduct(order_id, product_id, quantity);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', verifyAuthToken_1.default, index);
    app.get('/order/show', verifyAuthToken_1.default, show);
    app.post('/order', verifyAuthToken_1.default, create);
    app.delete('/order', verifyAuthToken_1.default, destroy);
    app.post('/orders/products', verifyAuthToken_1.default, addProduct);
};
exports.default = orderRoutes;

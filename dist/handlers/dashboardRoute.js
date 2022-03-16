"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardService_1 = require("../services/dashboardService");
const verifyAuthToken_1 = __importDefault(require("../middlewae/verifyAuthToken"));
const dashboardRoutes = (app) => {
    app.get('/products_in_orders', verifyAuthToken_1.default, productsInOrders);
    app.get('/users_with_orders', verifyAuthToken_1.default, usersinOrders);
};
const dashboard = new dashboardService_1.Dashboard();
const usersinOrders = async (_req, res) => {
    try {
        const users = await dashboard.usersMakingOrders();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productsInOrders = async (_req, res) => {
    try {
        const products = await dashboard.productsInOrders();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = dashboardRoutes;

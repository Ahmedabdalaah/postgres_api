"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
/* eslint-disable prettier/prettier */
const database_1 = __importDefault(require("../database"));
class Dashboard {
    async usersMakingOrders() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT firstName, lastName,phone FROM userP INNER JOIN orderT ON userP.id = orderT.user_id';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`couldnot get users who making orders: ${err}`);
        }
    }
    async productsInOrders() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT productName,price FROM product INNER JOIN order_product ON product.id = order_product.product_id;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`couldnot get users who making orders: ${err}`);
        }
    }
}
exports.Dashboard = Dashboard;

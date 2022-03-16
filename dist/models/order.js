"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
/* eslint-disable prettier/prettier */
const database_1 = __importDefault(require("../database"));
class orderStore {
    // index
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orderT';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get these orders. Error: ${err}`);
        }
    }
    // show
    async show(order_id) {
        try {
            const sql = 'SELECT * FROM orderT WHERE order_id=($1)';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [order_id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order with id : ${order_id}. Error: ${err}`);
        }
    }
    // create
    async create(o) {
        try {
            const sql = 'INSERT INTO orderT (order_id,user_id,order_status) VALUES($1,$2,$3) RETURNING *;';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [o.order_id, o.user_id, o.order_status]);
            const order = result.rows[0];
            connection.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.order_id}. Error: ${err}`);
        }
    }
    // delete
    async delete(order_id) {
        try {
            const sql = 'DELETE FROM orderT WHERE order_id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${order_id}. Error: ${err}`);
        }
    }
    // add product
    async addProduct(order_id, product_id, quantity) {
        try {
            const sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *;';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [order_id, product_id, quantity]);
            const order = result.rows[0];
            connection.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new product ${product_id} with id ${order_id} . Error: ${err}`);
        }
    }
}
exports.orderStore = orderStore;

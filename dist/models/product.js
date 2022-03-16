"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
/* eslint-disable prettier/prettier */
const database_1 = __importDefault(require("../database"));
class productStore {
    // index
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get these products. Error: ${err}`);
        }
    }
    // show
    async show(id) {
        try {
            const sql = 'SELECT * FROM product WHERE id=($1)';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product with id : ${id}. Error: ${err}`);
        }
    }
    // create
    async create(p) {
        try {
            const sql = 'INSERT INTO product (id,productName,price,category) VALUES($1,$2,$3,$4) RETURNING *;';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [p.id, p.productName, p.price, p.category]);
            const product = result.rows[0];
            connection.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${p.id}. Error: ${err}`);
        }
    }
    // delete
    async delete(id) {
        try {
            const sql = 'DELETE FROM product WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.productStore = productStore;

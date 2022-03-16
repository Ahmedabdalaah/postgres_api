"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
/* eslint-disable prettier/prettier */
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.TOKEN_SECRET;
const saltRounds = process.env.SALT_ROUNDS;
class userStore {
    // index
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM userP';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get these users. Error: ${err}`);
        }
    }
    // show
    async show(id) {
        try {
            const sql = 'SELECT * FROM userP WHERE id=($1)';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user with id : ${id}. Error: ${err}`);
        }
    }
    // create
    async create(u) {
        try {
            const sql = 'INSERT INTO userP (id,firstName,lastName,userPassword,phone) VALUES($1,$2,$3,$4,$5) RETURNING *;';
            const connection = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await connection.query(sql, [u.id, u.firstName, u.lastName, hash, u.phone]);
            const user = result.rows[0];
            connection.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${u.id}): ${err}`);
        }
    }
    // authenticate
    async authenticate(firstName, password) {
        const connection = await database_1.default.connect();
        const sql = 'SELECT userPassword FROM userP WHERE firstName=($1)';
        const result = await connection.query(sql, [firstName]);
        if (password && result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.userPassword)) {
                return user;
            }
        }
        return null;
    }
    // delete
    async delete(id) {
        try {
            const sql = 'DELETE FROM userP WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
exports.userStore = userStore;

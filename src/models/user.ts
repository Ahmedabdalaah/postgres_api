/* eslint-disable prettier/prettier */
import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export type User = {
  // eslint-disable-next-line prettier/prettier
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  phone: number;
};
const pepper = process.env.TOKEN_SECRET;
const saltRounds = process.env.SALT_ROUNDS as string;
export class userStore {
  // index
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM userP';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get these users. Error: ${err}`);
    }
  }
  // show
  async show(id?: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM userP WHERE id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with id : ${id}. Error: ${err}`);
    }
  }
  // create
  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO userP (id,firstName,lastName,userPassword,phone) VALUES($1,$2,$3,$4,$5) RETURNING *;';
      const connection = await client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [u.id, u.firstName, u.lastName, hash, u.phone]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.id}): ${err}`);
    }
  }
  // authenticate
  async authenticate(firstName: string, password: string): Promise<User | null> {
    const connection = await client.connect();
    const sql = 'SELECT userPassword FROM userP WHERE firstName=($1)';
    const result = await connection.query(sql, [firstName]);
    if (password && result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.userPassword)) {
        return user;
      }
    }
    return null;
  }
  // delete
  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM userP WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}

/* eslint-disable prettier/prettier */
import client from '../database';

export type Product = {
  id?: number;
  productName: string;
  price: number;
  category: string;
};

export class productStore {
  // index
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get these products. Error: ${err}`);
    }
  }
  // show
  async show(id?: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM product WHERE id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product with id : ${id}. Error: ${err}`);
    }
  }
  // create
  async create(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO product (id,productName,price,category) VALUES($1,$2,$3,$4) RETURNING *;';
      const connection = await client.connect();
      const result = await connection.query(sql, [p.id, p.productName, p.price, p.category]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.id}. Error: ${err}`);
    }
  }
  // delete
  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM product WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}

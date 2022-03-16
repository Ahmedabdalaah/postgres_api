/* eslint-disable prettier/prettier */
import client from '../database';
export type Order = {
  // eslint-disable-next-line prettier/prettier
  order_id?: number;
  user_id?: number;
  order_status: string;
};

export class orderStore {
  // index
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orderT';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get these orders. Error: ${err}`);
    }
  }
  // show
  async show(order_id?: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orderT WHERE order_id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [order_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with id : ${order_id}. Error: ${err}`);
    }
  }
  // create
  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orderT (order_id,user_id,order_status) VALUES($1,$2,$3) RETURNING *;';
      const connection = await client.connect();
      const result = await connection.query(sql, [o.order_id, o.user_id, o.order_status]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.order_id}. Error: ${err}`);
    }
  }
  // delete
  async delete(order_id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orderT WHERE order_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [order_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${order_id}. Error: ${err}`);
    }
  }
  // add product
  async addProduct(order_id: number, product_id: number, quantity: number): Promise<Order> {
    try {
      const sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *;';
      const connection = await client.connect();
      const result = await connection.query(sql, [order_id, product_id, quantity]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new product ${product_id} with id ${order_id} . Error: ${err}`);
    }
  }
}

/* eslint-disable prettier/prettier */
import client from '../database';
export class Dashboard {
  async usersMakingOrders(): Promise<{ firstName: string; lastName: string; phone: number }[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT firstName, lastName,phone FROM userP INNER JOIN orderT ON userP.id = orderT.user_id';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`couldnot get users who making orders: ${err}`);
    }
  }
  async productsInOrders(): Promise<{ productName: string; price: number }[]> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT productName,price FROM product INNER JOIN order_product ON product.id = order_product.product_id;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`couldnot get users who making orders: ${err}`);
    }
  }
}

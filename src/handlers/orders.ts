/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
// eslint-disable-next-line prettier/prettier
import { Order, orderStore } from '../models/order';
import verifyAuthToken from '../middlewae/verifyAuthToken';
const store = new orderStore();
const index = async (_req: Request, res: Response) => {
  try{
 const orders = await store.index();
  // eslint-disable-next-line prettier/prettier
  res.json(orders);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try{
  const id = parseInt(req.body.id as string);
  const orders = await store.show(id);
  res.json(orders);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      order_id: parseInt(req.body.order_id as string),
      user_id: parseInt(req.body.user_id as string),
      order_status: req.body.order_status,
    };
    if (order.order_status === '') {
      res.status(400).send('order_status is required');
    } else if (order.order_status != 'complete' && order.order_status != 'active') {
      res.status(400).send('order_status should be complete or active');
    } else {
      const newOrder = await store.create(order);
      res.json(newOrder);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try{
     const order_id = parseInt(req.body.order_id as string);
  const deleted = await store.delete(order_id);
  res.json(deleted);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
const addProduct = async (req: Request, res: Response) => {
  try{
  const order_id: number = parseInt(req.body.order_id as string);
  const product_id: number = parseInt(req.body.product_id as string);
  const quantity: number = parseInt(req.body.quantity as string);
  const order = await store.addProduct(order_id, product_id, quantity);
  res.json(order);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/order/show', verifyAuthToken, show);
  app.post('/order', verifyAuthToken, create);
  app.delete('/order', verifyAuthToken, destroy);
  app.post('/orders/products', verifyAuthToken, addProduct);
};

export default orderRoutes;
